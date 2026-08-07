import { SubjectStore } from '@academic/subject/services';
import { Component, inject } from '@angular/core';
import { SubjectTable } from '@academic/subject/components';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { Subject } from '@academic/subject/models';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemDialog } from '../../../../core/components';

@Component({
  selector: 'app-subject-list',
  imports: [SubjectTable, MatAnchor, MatIcon, MatProgressBar],
  templateUrl: './subject-list.html',
  styles: ``,
})
export class SubjectList {
  private readonly subjectStore = inject(SubjectStore);
  private readonly dialog = inject(MatDialog);

  protected readonly subjects = this.subjectStore.subjects;

  protected readonly loading = this.subjectStore.subjects;

  ngOnInit(): void {
    this.subjectStore.load();
  }

  protected onDelete(subject: Subject) {
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
