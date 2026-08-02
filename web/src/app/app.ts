import { Component, signal } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatDivider],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('TeachDocs');
}
