import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediumService } from '@preference/medium-of-instruction/services';
import { MediumTable } from '@preference/medium-of-instruction/components';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-medium-list',
  imports: [MediumTable, MatAnchor, MatIcon],
  templateUrl: './medium-list.html',
  styles: ``,
})
export class MediumList {
  private readonly mediumService = inject(MediumService);
  private readonly mediaResponse = toSignal(this.mediumService.findAll());

  protected readonly media = computed(() => this.mediaResponse()?.data ?? []);
}
