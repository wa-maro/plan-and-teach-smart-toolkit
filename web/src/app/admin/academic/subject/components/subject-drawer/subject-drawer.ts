import { Subject } from '@academic/subject/models';
import { Component, model, signal } from '@angular/core';
import { DrawerComponent } from '@shared/components';
import { CreateSubjectForm } from '../create-subject-form/create-subject-form';
import { SubjectDetail } from '../subject-detail/subject-detail';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

type DrawerMode = 'create' | 'show';

@Component({
  selector: 'app-subject-drawer',
  imports: [DrawerComponent, CreateSubjectForm, SubjectDetail, MatIconButton, MatIcon],
  templateUrl: './subject-drawer.html',
  styles: ``,
})
export class SubjectDrawer {
  opened = model.required<boolean>();

  protected readonly mode = signal<DrawerMode | null>(null);

  protected readonly selectedSubject = signal<Subject | null>(null);

  onDrawerStateChange(opened: boolean): void {
    if (!opened) {
      this.mode.set(null);
      this.selectedSubject.set(null);
    }
  }

  openCreate() {
    this.selectedSubject.set(null);
    this.mode.set('create');
    this.opened.set(true);
  }

  openShow(subject: Subject) {
    this.selectedSubject.set(subject);
    this.mode.set('show');
    this.opened.set(true);
  }

  close() {
    this.opened.set(false);
    this.mode.set(null);
    this.selectedSubject.set(null);
  }
}
