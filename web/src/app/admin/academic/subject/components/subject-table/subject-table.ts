import { Subject } from '@academic/subject/models';
import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-subject-table',
  imports: [MatTableModule, DatePipe],
  templateUrl: './subject-table.html',
  styles: ``,
})
export class SubjectTable {
  readonly subjects = input.required<Subject[]>();
  protected readonly displayedColumns = ['index', 'name', 'mediumOfInstruction', 'updatedAt'];
}
