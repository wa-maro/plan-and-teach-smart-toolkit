import {
  Component,
  computed,
  contentChildren,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { MatColumnDef, MatTable, MatTableModule } from '@angular/material/table';
import { DeleteItemAction } from '../../../admin/core/components';

export interface SelectedRow<T> {
  row: T;
  action: 'show' | 'delete';
}

@Component({
  selector: 'app-table-component',
  imports: [MatTableModule, DeleteItemAction],
  templateUrl: './table-component.html',
  styles: ``,
})
export class TableComponent<T> {
  readonly dataSource = input.required<T[]>();
  readonly displayedColumns = input<string[]>([]);

  protected readonly keyColumns = computed(() => ['index', ...this.displayedColumns(), 'actions']);

  protected readonly selectedRow = output<SelectedRow<T>>();

  private readonly table = viewChild.required(MatTable);
  private readonly columnDefs = contentChildren(MatColumnDef);

  constructor() {
    effect(() => {
      const table = this.table();

      this.columnDefs().forEach((columnDef) => {
        table.addColumnDef(columnDef);
      });
    });
  }

  protected onRowSelect = (data: SelectedRow<T>) => {
    this.selectedRow.emit(data);
  };
}
