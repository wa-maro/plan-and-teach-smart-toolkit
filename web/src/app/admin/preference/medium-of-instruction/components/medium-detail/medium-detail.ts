import { Component, computed, inject, input, OnInit } from '@angular/core';
import { MediumOfInstruction } from '@preference/medium-of-instruction/models';
import { MatDivider } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { MediumStore } from '@preference/medium-of-instruction/services';
import { MediumForm } from '../medium-form/medium-form';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-medium-detail',
  imports: [
    DatePipe,
    MediumForm,
    MatIcon,
    MatChipsModule,
    RouterLink,
    MatProgressSpinner,
    MatDivider,
  ],
  templateUrl: './medium-detail.html',
  styles: ``,
})
export class MediumDetail implements OnInit {
  private readonly mediumStore = inject(MediumStore);

  readonly selectedMedium = input.required<MediumOfInstruction>();

  private readonly detailMedium = this.mediumStore.detailMedium;

  protected readonly loading = this.mediumStore.detailLoading;

  protected readonly medium = computed(() => this.detailMedium() ?? this.selectedMedium());

  ngOnInit(): void {
    this.mediumStore.detail(this.selectedMedium().id);
  }
}
