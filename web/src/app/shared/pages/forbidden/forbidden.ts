import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@shared/auth/stores';
import { getDashboardRoute } from '@shared/auth/utils';

@Component({
  selector: 'app-forbidden',
  imports: [RouterLink],
  templateUrl: './forbidden.html',
  styles: ``,
})
export class Forbidden {
  private readonly authStore = inject(AuthStore);

  private readonly currentUser = this.authStore.currentUser;

  protected readonly homeRoute = computed(() => {
    const user = this.currentUser();

    return user ? getDashboardRoute(user.role) : '/';
  });
}
