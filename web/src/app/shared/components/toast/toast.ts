import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ToastService } from './service';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toast',
  imports: [MatIcon, MatIconButton],
  templateUrl: './toast.html',
  styles: ``,
})
export class ToastComponent {
  private readonly toastService = inject(ToastService);

  protected readonly toasts = this.toastService.toasts;

  protected removeToast(id: string) {
    this.toastService.remove(id);
  }
}
