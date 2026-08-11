import { Component, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginationChange } from '@shared/types/navigation';

@Component({
  selector: 'app-paginator',
  imports: [MatPaginatorModule],
  templateUrl: './paginator.html',
  styles: ``,
})
export class Paginator {
  protected readonly pageSizeOptions = [10, 25, 50];

  readonly total = input.required<number>();
  readonly page = input.required<number>();
  readonly limit = input.required<number>();

  readonly paginationChange = output<PaginationChange>();

  protected onPageChange(event: PageEvent) {
    this.paginationChange.emit({
      page: event.pageIndex + 1,
      limit: event.pageSize,
    });
  }
}
