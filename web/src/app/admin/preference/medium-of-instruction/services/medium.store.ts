import { computed, inject, Service, signal } from '@angular/core';
import { MediumService } from './medium.service';
import { MediumOfInstruction } from '../models';
import { finalize } from 'rxjs';
import { ToastService } from '@shared/components/toast/service';

interface MediumState {
  media: MediumOfInstruction[];
  loading: boolean;
}

@Service()
export class MediumStore {
  private readonly mediumService = inject(MediumService);
  private readonly toastService = inject(ToastService);

  private readonly _state = signal<MediumState>({
    media: [],
    loading: false,
  });

  readonly media = computed(() => this._state().media);

  readonly loading = computed(() => this._state().loading);

  load(): void {
    this.updateCurrentState({ loading: true });

    this.mediumService
      .getMedia()
      .pipe(finalize(() => this.updateCurrentState({ loading: false })))
      .subscribe({
        next: ({ data }) => this.updateCurrentState({ media: data }),
        error: () => {},
      });
  }

  delete(id: string): void {
    this.updateCurrentState({ loading: true });

    this.mediumService
      .deleteMedium(id)
      .pipe(finalize(() => this.updateCurrentState({ loading: false })))
      .subscribe({
        next: () => {
          const updatedMedia = this.media().filter((medium) => medium.id !== id);

          this.updateCurrentState({ media: updatedMedia });

          this.toastService.success('Medium of instruction deleted successfully.');
        },
        error: () => {},
      });
  }

  private updateCurrentState(partial: Partial<MediumState>): void {
    this._state.update((state) => ({
      ...state,
      ...partial,
    }));
  }
}
