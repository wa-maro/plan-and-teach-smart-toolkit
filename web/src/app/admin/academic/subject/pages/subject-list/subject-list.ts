import { SubjectStore } from '@academic/subject/services';
import { Component, inject, signal, viewChild } from '@angular/core';
import { SubjectTable, SubjectDrawer } from '@academic/subject/components';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { Subject } from '@academic/subject/models';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemDialog } from '@core/components';
import { SelectedRow } from '@shared/components';

@Component({
  selector: 'app-subject-list',
  imports: [SubjectTable, MatAnchor, MatIcon, MatProgressSpinner, SubjectDrawer],
  templateUrl: './subject-list.html',
  styles: ``,
})
export class SubjectList {
  private readonly subjectStore = inject(SubjectStore);
  private readonly dialog = inject(MatDialog);

  protected drawerOpened = signal(false);

  private readonly subjectDrawer = viewChild.required(SubjectDrawer);

  protected readonly subjects = this.subjectStore.subjects;

  protected readonly loading = this.subjectStore.loading;

  ngOnInit(): void {
    this.subjectStore.load();
  }

  protected getSelectedSubject(data: SelectedRow<Subject>) {
    if (data.action === 'show') {
      this.subjectDrawer().openShow(data.row);
      return;
    }

    if (data.action === 'delete') {
      this.deleteSubject(data.row);
    }
  }

  private deleteSubject(subject: Subject) {
    const dialogRef = this.dialog.open(DeleteItemDialog, {
      width: '400px',
      data: {
        id: subject.id,
        name: subject.name,
        title: 'Subject',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.subjectStore.delete(subject.id);
    });
  }
}
