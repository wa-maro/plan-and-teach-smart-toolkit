import { Component, inject } from '@angular/core';
import { MediumStore } from '@preference/medium-of-instruction/services';
import { MediumForm } from '../medium-form/medium-form';
import { CreateMediumDto } from '@preference/medium-of-instruction/models';

@Component({
  selector: 'app-create-medium-form',
  imports: [MediumForm],
  templateUrl: './create-medium-form.html',
  styles: ``,
})
export class CreateMediumForm {
  private readonly mediumStore = inject(MediumStore);

  protected create(dto: CreateMediumDto): void {
    this.mediumStore.create(dto);
  }
}
