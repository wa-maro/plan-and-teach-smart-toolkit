import { SubjectStore } from '@academic/subject/services';
import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { SubjectTable, SubjectDrawer } from '@academic/subject/components';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { Subject } from '@academic/subject/models';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemDialog } from '@core/components';
import { SelectedRow } from '@shared/components';
import { Paginator } from '@shared/components/paginator/paginator';
import { PaginationChange, TableSortChange, UrlQueryParams } from '@shared/types/navigation';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-subject-list',
  imports: [SubjectTable, MatAnchor, MatIcon, MatProgressSpinner, SubjectDrawer, Paginator],
  templateUrl: './subject-list.html',
  styles: `
    .subject-list-container {
      height: calc(100vh - 190px);
    }
  `,
})
export class SubjectList {
  private readonly subjectStore = inject(SubjectStore);
  private readonly dialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected drawerOpened = signal(false);

  private readonly subjectDrawer = viewChild.required(SubjectDrawer);

  protected readonly subjects = this.subjectStore.subjects;

  protected readonly pagination = this.subjectStore.pagination;

  protected readonly loading = this.subjectStore.loading;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.subjectStore.load(this.getQueryParams(params));
    });
  }

  protected onSortChange(change: TableSortChange): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        sortBy: change.sortBy,
        sortOrder: change.sortOrder,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected onPaginationChange(change: PaginationChange): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: change.limit !== this.pagination()?.limit ? 1 : change.page,
        limit: change.limit,
      },
      queryParamsHandling: 'merge',
    });
  }

  protected readonly rowIndexOffset = computed(() => {
    const pagination = this.pagination();

    if (!pagination) {
      return 0;
    }

    return (pagination.page - 1) * pagination.limit;
  });

  protected getSelectedSubject(data: SelectedRow<Subject>) {
    if (data.action === 'show') {
      this.subjectDrawer().openShow(data.row);
      return;
    }

    if (data.action === 'delete') {
      this.deleteSubject(data.row);
    }
  }

  private deleteSubject(subject: Subject) {
    const dialogRef = this.dialog.open(DeleteItemDialog, {
      width: '400px',
      data: {
        id: subject.id,
        name: subject.name,
        title: 'Subject',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.subjectStore.delete(subject.id);
    });
  }

  private getQueryParams(params: ParamMap): UrlQueryParams {
    return {
      page: Number(params.get('page') ?? 1),
      limit: Number(params.get('limit') ?? 10),
      sortBy: params.get('sortBy') ?? undefined,
      sortOrder: this.getSortOrder(params.get('sortOrder')),
    };
  }

  private getSortOrder(value: string | null): 'asc' | 'desc' | undefined {
    return value === 'asc' || value === 'desc' ? value : undefined;
  }
}
