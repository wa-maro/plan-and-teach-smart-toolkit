import { Component, model } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-header-toolbar',
  imports: [MatToolbar, MatIcon, MatIconButton],
  templateUrl: './header-toolbar.html',
  styles: `
    mat-toolbar {
      background: white;
    }
  `,
})
export class HeaderToolbar {
  opened = model.required<boolean>();

  protected toggle = () => this.opened.update((v) => !v);
}
