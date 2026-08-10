import { MediumStore } from '@preference/medium-of-instruction/services';
import { Component, inject, OnInit } from '@angular/core';
import { SubjectStore } from '@academic/subject/services';
import { SubjectForm } from '../subject-form/subject-form';
import { CreateSubjectDto } from '@academic/subject/models';

@Component({
  selector: 'app-create-subject-form',
  imports: [SubjectForm],
  templateUrl: './create-subject-form.html',
  styles: ``,
})
export class CreateSubjectForm implements OnInit {
  private readonly subjectStore = inject(SubjectStore);
  private readonly mediumStore = inject(MediumStore);

  protected readonly mediaOptions = this.mediumStore.media;

  ngOnInit() {
    this.mediumStore.load();
  }

  protected create(dto: CreateSubjectDto): void {
    this.subjectStore.create(dto);
  }
}
