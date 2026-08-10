import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MediumOfInstruction } from '@preference/medium-of-instruction/models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface MediumFormValue {
  name: string;
  code: string;
}

@Component({
  selector: 'app-medium-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './medium-form.html',
  styles: ``,
})
export class MediumForm {
  readonly medium = input<MediumOfInstruction | null>(null);
  readonly submitted = output<MediumFormValue>();

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

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.form.getRawValue());
  }
}
