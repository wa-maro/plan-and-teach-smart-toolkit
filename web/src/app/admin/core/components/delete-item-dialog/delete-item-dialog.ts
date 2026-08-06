import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, inject } from '@angular/core';
import { MatAnchor } from '@angular/material/button';

export interface DeleteItemDialogData {
  id: string;
  name: string;
  title: string;
}

@Component({
  selector: 'app-delete-item-dialog',
  imports: [MatDialogModule, MatAnchor],
  templateUrl: './delete-item-dialog.html',
  styles: ``,
})
export class DeleteItemDialog {
  private readonly dialogRef = inject(MatDialogRef<DeleteItemDialog>);
  protected readonly data = inject<DeleteItemDialogData>(MAT_DIALOG_DATA);

  protected cancel(): void {
    this.dialogRef.close(false);
  }

  protected confirm(): void {
    this.dialogRef.close(true);
  }
}
