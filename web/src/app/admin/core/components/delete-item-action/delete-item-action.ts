import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-delete-item-action',
  imports: [MatButtonModule, MatIcon],
  templateUrl: './delete-item-action.html',
  styles: ``,
})
export class DeleteItemAction {
  readonly item = input.required<unknown>();
  readonly deleteItem = output<unknown>();

  protected onDelete(event: MouseEvent) {
    event.stopPropagation();
    this.deleteItem.emit(this.item());
  }
}
