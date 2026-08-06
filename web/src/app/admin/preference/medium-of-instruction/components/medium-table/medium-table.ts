import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MediumOfInstruction } from '@preference/medium-of-instruction/models';
import { DeleteItemAction } from '../../../../core/components';

@Component({
  selector: 'app-medium-table',
  imports: [MatTableModule, DatePipe, DeleteItemAction],
  templateUrl: './medium-table.html',
  styles: ``,
})
export class MediumTable {
  readonly media = input.required<MediumOfInstruction[]>();
  protected readonly displayedColumns = ['index', 'name', 'updatedAt', 'actions'];

  protected readonly deleteSubject = output<MediumOfInstruction>();

  protected onDelete(item: MediumOfInstruction) {
    this.deleteSubject.emit(item);
  }
}
