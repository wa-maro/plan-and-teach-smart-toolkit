import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '@shared/components/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  template: `<router-outlet /> <app-toast />`,
  styles: ``,
})
export class App {
  protected readonly title = signal('TeachDocs');
}
