import { SubjectService } from '@academic/subject/services';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SubjectTable } from '@academic/subject/components';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-subject-list',
  imports: [SubjectTable, MatAnchor, MatIcon],
  templateUrl: './subject-list.html',
  styles: ``,
})
export class SubjectList {
  private readonly subjectService = inject(SubjectService);
  private readonly subjectsResponse = toSignal(this.subjectService.findAll());

  protected readonly subjects = computed(() => this.subjectsResponse()?.data ?? []);
}
