import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavLinkItem } from '../../interfaces/navlink-item.interface';
import { HeaderToolbar } from '../header-toolbar/header-toolbar';
import { AsideNavbar } from '../aside-navbar/aside-navbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-panel-layout',
  imports: [MatSidenavModule, HeaderToolbar, AsideNavbar, RouterOutlet],
  templateUrl: './panel-layout.html',
  styles: `
    .dashboard-container {
      height: calc(100vh - 70px);
    }

    mat-sidenav {
      width: 18rem;
      border-right: 1px solid rgb(226 232 240);
    }

    mat-sidenav aside {
      height: 100%;
      overflow-y: auto;
    }

    mat-sidenav-content {
      background-color: rgb(248 250 252);
    }

    mat-sidenav-content main {
      min-height: 100%;
    }

    @media (max-width: 768px) {
      mat-sidenav {
        width: min(85vw, 18rem);
      }
    }
  `,
})
export class PanelLayout {
  private breakpointObserver = inject(BreakpointObserver);
  private route = inject(ActivatedRoute);

  protected opened = signal<boolean>(false);
  protected isMobile = signal<boolean>(false);

  protected readonly navLinks = this.route.snapshot.data['navLinks'] as NavLinkItem[];

  constructor() {
    effect(() => {
      this.opened.set(this.isMobile() ? false : true);
    });

    this.breakpointObserver
      .observe('(max-width: 992px)')
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        this.isMobile.set(result.matches);
      });
  }
}
