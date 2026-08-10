import { computed, inject, Service, signal } from '@angular/core';
import { SubjectService } from './subject.service';
import { CreateSubjectDto, Subject } from '../models';
import { finalize } from 'rxjs';
import { ToastService } from '@shared/components/toast/service';
import { UpdateMediumDto } from '@preference/medium-of-instruction/models';

interface SubjectState {
  subjects: Subject[];
  loading: boolean;
  detailSubject: Subject | null;
  detailLoading: boolean;
}

@Service()
export class SubjectStore {
  private readonly subjectService = inject(SubjectService);
  private readonly toastService = inject(ToastService);

  private readonly _state = signal<SubjectState>({
    subjects: [],
    loading: false,
    detailSubject: null,
    detailLoading: false,
  });

  readonly subjects = computed(() => this._state().subjects);

  readonly loading = computed(() => this._state().loading);

  readonly detailSubject = computed(() => this._state().detailSubject);

  readonly detailLoading = computed(() => this._state().detailLoading);

  create(dto: CreateSubjectDto): void {
    this.updateCurrentState({ loading: true });

    this.subjectService
      .createSubject(dto)
      .pipe(finalize(() => this.updateCurrentState({ loading: false })))
      .subscribe({
        next: (data) => {
          this.updateCurrentState({ subjects: [...this.subjects(), data] });

          this.toastService.success('Subject created successfully.');
        },
        error: () => {},
      });
  }

  load(): void {
    this.updateCurrentState({ loading: true });

    this.subjectService
      .getSubjects()
      .pipe(finalize(() => this.updateCurrentState({ loading: false })))
      .subscribe({
        next: ({ data }) => this.updateCurrentState({ subjects: data }),
        error: () => {},
      });
  }

  detail(id: string): void {
    this.updateCurrentState({
      detailSubject: null,
      detailLoading: true,
    });

    this.subjectService
      .getSubject(id)
      .pipe(finalize(() => this.updateCurrentState({ detailLoading: false })))
      .subscribe({
        next: (data) => this.updateCurrentState({ detailSubject: data }),
        error: () => {},
      });
  }

  update(id: string, dto: UpdateMediumDto) {
    this.updateCurrentState({
      detailLoading: true,
      loading: true,
    });

    this.subjectService
      .updateSubject(id, dto)
      .pipe(finalize(() => this.updateCurrentState({ detailLoading: false, loading: false })))
      .subscribe({
        next: (data) => {
          const updatedSubject = this.subjects().map((subject) =>
            subject.id === id ? data : subject,
          );

          this.updateCurrentState({
            detailSubject: data,
            subjects: updatedSubject,
          });

          this.toastService.success('Subject updated successfully.');
        },
        error: () => {},
      });
  }

  delete(id: string): void {
    this.updateCurrentState({ loading: true });

    this.subjectService
      .deleteSubject(id)
      .pipe(finalize(() => this.updateCurrentState({ loading: false })))
      .subscribe({
        next: () => {
          const updatedSubjects = this.subjects().filter((subject) => subject.id !== id);

          this.updateCurrentState({ subjects: updatedSubjects });

          this.toastService.success('Subject deleted successfully.');
        },
        error: () => {},
      });
  }

  private updateCurrentState(partial: Partial<SubjectState>): void {
    this._state.update((state) => ({
      ...state,
      ...partial,
    }));
  }
}
