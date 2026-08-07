import { computed, Service, signal } from '@angular/core';
import { Subject } from '../models';

interface SubjectState {
  subjects: Subject[];
  loading: boolean;
}

@Service()
export class SubjectStore {
  private readonly _state = signal<SubjectState>({
    subjects: [],
    loading: false,
  });

  readonly subjects = computed(() => this._state().subjects);

  readonly loading = computed(() => this._state().loading);

  private updateCurrentState(partial: Partial<SubjectState>): void {
    this._state.update((state) => ({
      ...state,
      ...partial,
    }));
  }
}
