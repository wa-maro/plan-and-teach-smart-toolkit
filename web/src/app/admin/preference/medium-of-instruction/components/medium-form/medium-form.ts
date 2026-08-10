import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MediumOfInstruction } from '@preference/medium-of-instruction/models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-medium-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './medium-form.html',
  styles: ``,
})
export class MediumForm {
  readonly medium = input<MediumOfInstruction | null>(null);

  protected readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    code: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {
    effect(() => {
      const medium = this.medium();

      if (!medium) {
        this.form.reset();
        return;
      }

      this.form.patchValue({
        name: medium.name,
        code: medium.code,
      });
    });
  }
}
