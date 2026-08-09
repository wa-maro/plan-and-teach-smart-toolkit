import { Component, model } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-drawer-component',
  imports: [MatDrawer, MatDrawerContent, MatDrawerContainer],
  templateUrl: './drawer-component.html',
  styles: ``,
})
export class DrawerComponent {
  opened = model.required<boolean>();
}
