import { computed, inject, Service, signal } from '@angular/core';
import { SubjectService } from './subject.service';
import { Subject } from '../models';
import { finalize } from 'rxjs';
import { ToastService } from '@shared/components/toast/service';

interface SubjectState {
  subjects: Subject[];
  loading: boolean;
}

@Service()
export class SubjectStore {
  private readonly subjectService = inject(SubjectService);
  private readonly toastService = inject(ToastService);

  private readonly _state = signal<SubjectState>({
    subjects: [],
    loading: false,
  });

  readonly subjects = computed(() => this._state().subjects);

  readonly loading = computed(() => this._state().loading);

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

  delete(id: string): void {
    this.updateCurrentState({ loading: true });

    this.subjectService
      .deleteSubject(id)
      .pipe(finalize(() => this.updateCurrentState({ loading: false })))
      .subscribe({
        next: () => {
          const updatedMedia = this.subjects().filter((subject) => subject.id !== id);

          this.updateCurrentState({ subjects: updatedMedia });

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
