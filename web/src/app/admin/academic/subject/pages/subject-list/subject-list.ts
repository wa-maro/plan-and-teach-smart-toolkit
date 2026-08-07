import { SubjectStore } from '@academic/subject/services';
import { Component, inject } from '@angular/core';
import { SubjectTable } from '@academic/subject/components';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { Subject } from '@academic/subject/models';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-subject-list',
  imports: [SubjectTable, MatAnchor, MatIcon, MatProgressBar],
  templateUrl: './subject-list.html',
  styles: ``,
})
export class SubjectList {
  private readonly subjectStore = inject(SubjectStore);

  protected readonly subjects = this.subjectStore.subjects;

  protected readonly loading = this.subjectStore.subjects;

  ngOnInit(): void {
    this.subjectStore.load();
  }

  protected onDelete(subject: Subject) {}
}
