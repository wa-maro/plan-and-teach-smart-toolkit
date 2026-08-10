import { Component, effect, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from '@academic/subject/models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MediumOfInstruction } from '@preference/medium-of-instruction/models';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-subject-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './subject-form.html',
  styles: ``,
})
export class SubjectForm {
  readonly subject = input<Subject | null>(null);
  readonly mediaOptions = input<MediumOfInstruction[]>([]);

  protected readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    abbreviation: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    mediumOfInstructionId: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {
    effect(() => {
      const subject = this.subject();

      if (!subject) {
        this.form.reset();
        return;
      }

      this.form.patchValue({
        name: subject.name,
        abbreviation: subject.abbreviation,
        mediumOfInstructionId: subject.mediumOfInstruction?.id,
      });
    });
  }
}
