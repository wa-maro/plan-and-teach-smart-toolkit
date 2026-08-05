import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItemIcon } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavLinkItem } from '@shared/types/navigation';

@Component({
  selector: 'app-aside-navlink',
  imports: [RouterLink, RouterLinkActive, MatIcon, MatListItemIcon],
  templateUrl: './aside-navlink.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class AsideNavlink {
  readonly navLink = input.required<NavLinkItem>();
}
