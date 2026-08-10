import { Component, computed, input } from '@angular/core';
import { MediumOfInstruction } from '@preference/medium-of-instruction/models';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MediumForm } from '../medium-form/medium-form';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-medium-detail',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    DatePipe,
    MediumForm,
    MatIcon,
    MatChipsModule,
    RouterLink,
  ],
  templateUrl: './medium-detail.html',
  styles: ``,
})
export class MediumDetail {
  readonly selectedMedium = input.required<MediumOfInstruction>();

  protected readonly medium = computed(() => this.selectedMedium());
}
