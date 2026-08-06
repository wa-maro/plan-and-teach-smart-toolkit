import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MediumOfInstruction } from '@preference/medium-of-instruction/models';

@Component({
  selector: 'app-medium-table',
  imports: [MatTableModule, DatePipe],
  templateUrl: './medium-table.html',
  styles: ``,
})
export class MediumTable {
  readonly media = input.required<MediumOfInstruction[]>();
  protected readonly displayedColumns = ['index', 'name', 'updatedAt'];
}
