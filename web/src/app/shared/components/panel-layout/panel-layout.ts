import { ToastService } from '@shared/components/toast/service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderToolbar } from '../header-toolbar';
import { AsideNavbar } from '../aside-navbar';
import { NavLinkItem } from '@shared/types/navigation';
import { MatIcon } from '@angular/material/icon';
import { AuthStore } from '@shared/auth/stores';
import { take } from 'rxjs';

@Component({
  selector: 'app-panel-layout',
  imports: [MatSidenavModule, HeaderToolbar, AsideNavbar, RouterOutlet, MatIcon],
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
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authStore = inject(AuthStore);
  private readonly toastService = inject(ToastService);

  protected readonly isAuthenticated = this.authStore.isAuthenticated;

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

  protected logout = () => {
    this.authStore
      .logout()
      .pipe(take(1))
      .subscribe({
        complete: () => {
          this.router.navigate(['/auth/login']);
          this.toastService.info('Logged out successfully');
        },
      });
  };
}
