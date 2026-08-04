import { Component, input } from '@angular/core';
import { MatNavList } from '@angular/material/list';
import { NavLinkItem } from '../../interfaces/navlink-item.interface';
import { AsideNavlink } from '../aside-navlink/aside-navlink';

@Component({
  selector: 'app-aside-navbar',
  imports: [MatNavList, AsideNavlink],
  templateUrl: './aside-navbar.html',
  styles: ``,
})
export class AsideNavbar {
  readonly navLinks = input.required<NavLinkItem[]>();
}
