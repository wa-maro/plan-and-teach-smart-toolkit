import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm, LoginFormValue } from '@shared/auth/components';
import { AuthStore } from '@shared/auth/stores';
import { getDashboardRoute } from '@shared/auth/utils';
import { ToastService } from '@shared/components/toast/service';

@Component({
  selector: 'app-login',
  imports: [LoginForm],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  private readonly authStore = inject(AuthStore);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  protected readonly loading = this.authStore.loading;

  protected submit(formValue: LoginFormValue): void {
    this.authStore.login(formValue).subscribe({
      next: (user) => {
        this.toastService.success('Logged in successfully');

        const goTo = getDashboardRoute(user.role);
        this.router.navigate([goTo]);
      },
      error: () => {},
    });
  }
}
