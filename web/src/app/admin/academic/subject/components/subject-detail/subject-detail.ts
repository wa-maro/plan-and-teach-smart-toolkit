import { Subject, UpdateSubjectDto } from '@academic/subject/models';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { SubjectForm } from '../subject-form/subject-form';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { SubjectStore } from '@academic/subject/services';
import { MediumStore } from '@preference/medium-of-instruction/services';

@Component({
  selector: 'app-subject-detail',
  imports: [SubjectForm, MatDivider, MatIcon, DatePipe],
  templateUrl: './subject-detail.html',
  styles: ``,
})
export class SubjectDetail implements OnInit {
  private readonly subjectStore = inject(SubjectStore);
  private readonly mediumStore = inject(MediumStore);

  readonly selectedSubject = input.required<Subject>();

  private readonly detailSubject = this.subjectStore.detailSubject;

  protected readonly loading = this.subjectStore.detailLoading;

  protected readonly subject = computed(() => this.detailSubject() ?? this.selectedSubject());

  protected readonly mediaOptions = this.mediumStore.media;

  ngOnInit(): void {
    this.mediumStore.load();
    this.subjectStore.detail(this.selectedSubject().id);
  }

  update(dto: UpdateSubjectDto) {
    const changes = this.getChangedFields(dto);

    if (Object.keys(changes).length > 0) {
      this.subjectStore.update(this.subject().id, changes);
    }
  }

  private getChangedFields(dto: UpdateSubjectDto): UpdateSubjectDto {
    const current = this.subject();

    return Object.fromEntries(
      Object.entries(dto).filter(
        ([key, value]) => value !== undefined && value !== current[key as keyof typeof current],
      ),
    ) as UpdateSubjectDto;
  }
}
