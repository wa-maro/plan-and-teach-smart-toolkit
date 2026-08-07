import { computed, inject, Service, signal } from '@angular/core';
import { MediumService } from './medium.service';
import { MediumOfInstruction } from '../models';

interface MediumState {
  media: MediumOfInstruction[];
  loading: boolean;
}

@Service()
export class MediumStore {
  private readonly mediumService = inject(MediumService);

  private readonly _state = signal<MediumState>({
    media: [],
    loading: false,
  });

  readonly media = computed(() => this._state().media);

  readonly loading = computed(() => this._state().loading);

  private updateCurrentState(partial: Partial<MediumState>): void {
    this._state.update((state) => ({
      ...state,
      ...partial,
    }));
  }
}
