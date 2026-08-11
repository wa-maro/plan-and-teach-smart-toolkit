import { Component, model, signal } from '@angular/core';
import { MediumOfInstruction } from '@preference/medium-of-instruction/models';
import { DrawerComponent } from '@shared/components';
import { MediumDetail } from '../medium-detail/medium-detail';
import { CreateMediumForm } from '../create-medium-form/create-medium-form';

type MediumDrawerMode = 'create' | 'show';

@Component({
  selector: 'app-medium-drawer',
  imports: [DrawerComponent, MediumDetail, CreateMediumForm],
  templateUrl: './medium-drawer.html',
  styles: ``,
})
export class MediumDrawer {
  opened = model.required<boolean>();

  protected readonly mode = signal<MediumDrawerMode | null>(null);

  protected readonly selectedMedium = signal<MediumOfInstruction | null>(null);

  onDrawerStateChange(opened: boolean): void {
    if (!opened) {
      this.mode.set(null);
      this.selectedMedium.set(null);
    }
  }

  openCreate() {
    this.selectedMedium.set(null);
    this.mode.set('create');
    this.opened.set(true);
  }

  openShow(medium: MediumOfInstruction) {
    this.selectedMedium.set(medium);
    this.mode.set('show');
    this.opened.set(true);
  }

  close() {
    this.opened.set(false);
    this.mode.set(null);
    this.selectedMedium.set(null);
  }
}
