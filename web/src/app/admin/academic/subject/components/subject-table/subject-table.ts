import { Subject } from '@academic/subject/models';
import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SelectedRow, TableComponent } from '@shared/components';
import { TableSortChange } from '@shared/types/navigation';

@Component({
  selector: 'app-subject-table',
  imports: [MatTableModule, MatSortModule, DatePipe, TableComponent],
  templateUrl: './subject-table.html',
  styles: ``,
})
export class SubjectTable {
  readonly subjects = input.required<Subject[]>();
  protected readonly displayedColumns = ['name', 'mediumOfInstruction', 'updatedAt'];

  readonly rowIndexOffset = input(0);

  protected readonly selectedSubject = output<SelectedRow<Subject>>();

  protected readonly sortChange = output<TableSortChange>();

  protected onSelect(data: SelectedRow<Subject>) {
    this.selectedSubject.emit(data);
  }

  protected onSortChange(sort: Sort): void {
    if (!sort.direction) {
      return;
    }

    this.sortChange.emit({
      sortBy: sort.active,
      sortOrder: sort.direction,
    });
  }
}
