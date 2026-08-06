import { Subject } from '@academic/subject/models';
import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DeleteItemAction } from '../../../../core/components';

@Component({
  selector: 'app-subject-table',
  imports: [MatTableModule, DatePipe, DeleteItemAction],
  templateUrl: './subject-table.html',
  styles: ``,
})
export class SubjectTable {
  readonly subjects = input.required<Subject[]>();
  protected readonly displayedColumns = [
    'index',
    'name',
    'mediumOfInstruction',
    'updatedAt',
    'actions',
  ];

  protected readonly deleteSubject = output<Subject>();

  protected onDelete(item: Subject) {
    this.deleteSubject.emit(item);
  }
}
