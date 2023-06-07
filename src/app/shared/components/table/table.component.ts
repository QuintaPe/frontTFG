import {
  Component,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
  inject,
  ChangeDetectorRef,
  SimpleChanges,
  OnChanges,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { RowMenuComponent } from './rowMenu/row-menu.component';
import { InputSelectComponent } from '../inputs/input-select/input-select.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { DynamicIoModule } from 'ng-dynamic-component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RowMenuComponent,
    SkeletonComponent,
    InputSelectComponent,
    MatPaginatorModule,
    DynamicIoModule,
  ],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() columns: any[] = [];
  @Input() fetch?: any;
  @Input() pageSize: number = 10;
  @Input() mode: string = 'row';
  @Input() rowComponent!: Type<any>;
  @Input() componentInputs!: string[];
  @Input() forceFetch: number = 0;
  @Input() showPagination: boolean = true;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  search: string = '';
  filtersValue: any = {};
  sortedColumn: { name: string; sort: string } = { name: '', sort: '' };
  actualPage = 0;
  loading: boolean = true;
  showFilters: boolean = false;
  rows = signal({ items: [], total: 0 });

  private cd = inject(ChangeDetectorRef);

  fetchPage = async () => {
    if (this.fetch) {
      this.loading = true;
      const sort = this.sortedColumn.sort
        ? `${this.sortedColumn.sort}${this.sortedColumn.name}`
        : '';

      this.rows.set(
        await this.fetch(
          this.paginator?.pageIndex || this.actualPage,
          this.paginator?.pageSize || this.pageSize,
          this.search,
          this.filtersValue,
          sort
        )
      );
      this.loading = false;
    }
  };

  ngOnInit(): void {
    this.fetchPage();
    if (this.paginator) {
      this.paginator.page.pipe(tap(() => this.fetchPage())).subscribe();
    }
    this.cd.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['forceFetch']) {
      this.fetchPage();
    }
  }

  sortTable = async (column: any) => {
    if (column.sortable) {
      const columnName = column.sortableField || column.field;
      if (columnName) {
        let sort = '+';
        if (this.sortedColumn && this.sortedColumn.name === columnName) {
          if (this.sortedColumn.sort === '') {
            sort = '+';
          } else if (this.sortedColumn.sort === '+') {
            sort = '-';
          } else {
            sort = '';
          }
        }
        this.sortedColumn = { name: columnName, sort };
        this.fetchPage();
      }
    }
  };

  renderField = (row: any, column: any) => {
    const columnField = column.field || '';
    return column.preRender
      ? column.preRender(row[columnField], row)
      : row[columnField];
  };

  rowInputs(row: any) {
    const auxInputs: {[key: string]: any} = {}
    this.componentInputs.forEach(input => {
      auxInputs[input] = row[input];
    })
    return auxInputs;
  }
}
