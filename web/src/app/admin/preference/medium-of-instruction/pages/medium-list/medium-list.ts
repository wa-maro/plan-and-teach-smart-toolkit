import { MediumStore } from './../../services/medium.store';
import { Component, inject } from '@angular/core';
import { MediumTable } from '@preference/medium-of-instruction/components';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { MediumOfInstruction } from '@preference/medium-of-instruction/models';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-medium-list',
  imports: [MediumTable, MatAnchor, MatIcon, MatProgressBar],
  templateUrl: './medium-list.html',
  styles: ``,
})
export class MediumList {
  private readonly mediumStore = inject(MediumStore);

  protected readonly media = this.mediumStore.media;

  protected readonly loading = this.mediumStore.loading;

  ngOnInit(): void {
    this.mediumStore.load();
  }

  protected onDelete(medium: MediumOfInstruction) {}
}
