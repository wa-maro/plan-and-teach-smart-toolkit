import { MediumStore } from './../../services/medium.store';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { MediumOfInstruction } from '@preference/medium-of-instruction/models';

@Component({
  selector: 'app-medium-list',
  imports: [MatAnchor, MatIcon],
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
