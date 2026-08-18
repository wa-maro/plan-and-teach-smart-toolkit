import { Component, inject, model } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { AuthStore } from '@shared/auth/stores';

@Component({
  selector: 'app-header-toolbar',
  imports: [MatToolbar, MatIcon],
  templateUrl: './header-toolbar.html',
  styles: `
    mat-toolbar {
      background: white;
    }
  `,
})
export class HeaderToolbar {
  private readonly authStore = inject(AuthStore);

  opened = model.required<boolean>();

  protected readonly currentUser = this.authStore.currentUser;

  protected toggle = () => this.opened.update((v) => !v);
}
