import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnInit,
  Type,
  ViewChild,
  SimpleChanges,
  OnChanges,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { RowMenuComponent } from './rowMenu/row-menu.component';
import { InputSelectComponent } from '../inputs/input-select/input-select.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { DynamicIoModule } from 'ng-dynamic-component';
import { AvatarComponent } from '../Avatar/avatar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RowMenuComponent,
    SkeletonComponent,
    AvatarComponent,
    InputSelectComponent,
    MatPaginatorModule,
    DynamicIoModule,
    TranslateModule,
  ],
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() columns: any[] = [];
  @Input() fetch?: any;
  @Input() pageSize: number = 10;
  @Input() mode: string = 'row';
  @Input() rowComponent!: Type<any>;
  @Input() componentInputs!: string[];
  @Input() externalInputs: any = {};
  @Input() forceFetch: number = 0;
  @Input() showPagination: boolean = true;
  @Output() onClickRow = new EventEmitter<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  search: string = '';
  filtersValue: any = {};
  sortedColumn: { name: string; sort: string } = { name: '', sort: '' };
  actualPage = 0;
  loading: boolean = true;
  showFilters: boolean = false;
  rows = signal({ items: [], total: this.pageSize });

  private matPaginatorIntl = inject(MatPaginatorIntl);
  private translate = inject(TranslateService);


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
    this.matPaginatorIntl.itemsPerPageLabel = this.translate.instant('common.showPerPage');
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(tap(() => this.fetchPage())).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['forceFetch'] && this.forceFetch > 0) {
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

  renderAvatar = (row: any, column: any) => {
    return typeof column.fieldName === 'function'
      ? column.fieldName(row)
      : row[column.fieldName];
  };

  rowInputs(row: any) {
    const auxInputs: {[key: string]: any} = {}
    this.componentInputs.forEach(input => {
      auxInputs[input] = row[input];
    })
    Object.keys(this.externalInputs).forEach((key: string) => {
      auxInputs[key] = this.externalInputs[key];
    })
    return auxInputs;
  }
}
