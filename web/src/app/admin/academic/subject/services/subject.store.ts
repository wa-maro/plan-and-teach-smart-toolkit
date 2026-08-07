import { computed, inject, Service, signal } from '@angular/core';
import { SubjectService } from './subject.service';
import { Subject } from '../models';
import { finalize } from 'rxjs';

interface SubjectState {
  subjects: Subject[];
  loading: boolean;
}

@Service()
export class SubjectStore {
  private readonly subjectService = inject(SubjectService);

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
        error: (error) => console.error(error),
      });
  }

  private updateCurrentState(partial: Partial<SubjectState>): void {
    this._state.update((state) => ({
      ...state,
      ...partial,
    }));
  }
}
