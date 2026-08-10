import { computed, inject, Service, signal } from '@angular/core';
import { SubjectService } from './subject.service';
import { Subject } from '../models';
import { finalize } from 'rxjs';
import { ToastService } from '@shared/components/toast/service';

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
