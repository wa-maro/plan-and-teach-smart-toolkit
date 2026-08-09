import { MediumStore } from './../../services/medium.store';
import { Component, inject } from '@angular/core';
import { MediumTable } from '@preference/medium-of-instruction/components';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MediumOfInstruction } from '@preference/medium-of-instruction/models';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DeleteItemDialog } from '../../../../core/components';

@Component({
  selector: 'app-medium-list',
  imports: [MediumTable, MatAnchor, MatIcon, MatProgressSpinner],
  templateUrl: './medium-list.html',
  styles: ``,
})
export class MediumList {
  private readonly mediumStore = inject(MediumStore);
  private readonly dialog = inject(MatDialog);

  protected readonly media = this.mediumStore.media;

  protected readonly loading = this.mediumStore.loading;

  ngOnInit(): void {
    this.mediumStore.load();
  }

  protected onDelete(medium: MediumOfInstruction) {
    const dialogRef = this.dialog.open(DeleteItemDialog, {
      width: '400px',
      data: {
        id: medium.id,
        name: medium.name,
        title: 'Medium of instruction',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.mediumStore.delete(medium.id);
    });
  }
}
