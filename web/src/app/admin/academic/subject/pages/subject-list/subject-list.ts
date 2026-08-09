import { SubjectStore } from '@academic/subject/services';
import { Component, inject, signal } from '@angular/core';
import { SubjectTable } from '@academic/subject/components';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { Subject } from '@academic/subject/models';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemDialog } from '../../../../core/components';
import { SelectedRow } from '@shared/components';

@Component({
  selector: 'app-subject-list',
  imports: [SubjectTable, MatAnchor, MatIcon, MatProgressSpinner],
  templateUrl: './subject-list.html',
  styles: ``,
})
export class SubjectList {
  private readonly subjectStore = inject(SubjectStore);
  private readonly dialog = inject(MatDialog);

  private selectedSubject = signal<Subject | null>(null);

  protected readonly subjects = this.subjectStore.subjects;

  protected readonly loading = this.subjectStore.loading;

  ngOnInit(): void {
    this.subjectStore.load();
  }

  protected getSelectedSubject(data: SelectedRow<Subject>) {
    this.selectedSubject.set(data.row);

    const selected = this.selectedSubject();

    if (data.action === 'show' && selected) {
      //
    }

    if (data.action === 'delete' && selected) {
      this.deleteSubject(selected);
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
