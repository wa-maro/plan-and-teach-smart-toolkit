import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MediumOfInstruction } from '@preference/medium-of-instruction/models';
import { SelectedRow, TableComponent } from '@shared/components';

@Component({
  selector: 'app-medium-table',
  imports: [MatTableModule, DatePipe, TableComponent],
  templateUrl: './medium-table.html',
  styles: ``,
})
export class MediumTable {
  readonly media = input.required<MediumOfInstruction[]>();
  protected readonly displayedColumns = ['name', 'updatedAt'];

  protected selectedMedium = output<SelectedRow<MediumOfInstruction>>();

  protected onSelect(data: SelectedRow<MediumOfInstruction>) {
    this.selectedMedium.emit(data);
  }
}
