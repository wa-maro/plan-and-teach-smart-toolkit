import { Subject } from '@academic/subject/models';
import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SelectedRow, TableComponent } from '@shared/components';

@Component({
  selector: 'app-subject-table',
  imports: [MatTableModule, DatePipe, TableComponent],
  templateUrl: './subject-table.html',
  styles: ``,
})
export class SubjectTable {
  readonly subjects = input.required<Subject[]>();
  protected readonly displayedColumns = ['name', 'mediumOfInstruction', 'updatedAt'];

  protected readonly selectedSubject = output<SelectedRow<Subject>>();

  protected onSelect(data: SelectedRow<Subject>) {
    this.selectedSubject.emit(data);
  }
}
