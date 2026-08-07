import { Service, signal } from '@angular/core';
import { Toast, ToastType } from '../models';

@Service()
export class ToastService {
  readonly toasts = signal<Toast[]>([]);

  show(type: ToastType, message: string, duration = 5000) {
    const toast: Toast = {
      id: crypto.randomUUID(),
      type,
      message,
      duration,
    };

    this.toasts.update((list) => [...list, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(toast.id), duration);
    }
  }

  success(message: string) {
    this.show('success', message);
  }

  error(message: string) {
    this.show('error', message);
  }

  warning(message: string) {
    this.show('warning', message);
  }

  info(message: string) {
    this.show('info', message);
  }

  remove(id: string) {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
