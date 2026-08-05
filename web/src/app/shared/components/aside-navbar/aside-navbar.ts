import { Component, input } from '@angular/core';
import { MatNavList } from '@angular/material/list';
import { AsideNavlink } from '../aside-navlink';
import { NavLinkItem } from '@shared/types/navigation';

@Component({
  selector: 'app-aside-navbar',
  imports: [MatNavList, AsideNavlink],
  templateUrl: './aside-navbar.html',
  styles: ``,
})
export class AsideNavbar {
  readonly navLinks = input.required<NavLinkItem[]>();
}
