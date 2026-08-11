import { Component, model } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-drawer-component',
  imports: [MatDrawer, MatDrawerContent, MatDrawerContainer],
  templateUrl: './drawer-component.html',
  styles: `
    .drawer-container {
      height: calc(100vh - 70px);
    }

    mat-drawer {
      width: 24rem;
    }

    mat-drawer-content {
      background-color: rgb(248 250 252);
    }

    @media (max-width: 768px) {
      mat-drawer {
        width: min(85vw, 24rem);
      }
    }
  `,
})
export class DrawerComponent {
  opened = model.required<boolean>();
}
