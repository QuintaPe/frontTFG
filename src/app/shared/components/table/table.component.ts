import { Component, Input, AfterViewInit, Type, ViewChild, ViewContainerRef,
          inject, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
// import { Column } from './table.interface';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { tap } from 'rxjs';
import { RowMenuComponent } from './rowMenu/row-menu.component';
import { InputSelectComponent } from '../inputs/input-select/input-select.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    standalone: true,
    imports: [CommonModule, RowMenuComponent, SkeletonComponent, InputSelectComponent, MatPaginatorModule]
})

export class TableComponent implements AfterViewInit, OnChanges {
  @Input() columns: any[] = [];
  @Input() fetch?: any;
  @Input() pageSize: number = 10;
  @Input() mode: string = 'row';
  @Input() rowComponent!: Type<any>;
  @Input() forceFetch:number = 0;

  search: string = '';
  filtersValue: any = {};
  sortedColumn: {name: string, sort: string} = { name: '', sort: '' };
  actualPage = 0;
  loading: boolean = true;
  showFilters: boolean = false;
  rows: { items: {[key: string]: any}[], total: number} = { items: [], total: 0};

  @ViewChild('componentsContainer', { read: ViewContainerRef })
  componentsContainer!: ViewContainerRef

  @ViewChild('selectContainer', { read: ViewContainerRef })
  selectContainer!: ViewContainerRef

  @ViewChild(MatPaginator)
  paginator!: MatPaginator

  protected cdr = inject(ChangeDetectorRef);

  fetchLoadingPage = () => {
    this.loading = true;
    if (this.mode === 'component') {
      this.componentsContainer.clear();
      [...Array(this.pageSize)].forEach((_,i) => {
        const auxItem = this.componentsContainer.createComponent(this.rowComponent)
        auxItem.setInput('_id', i);
        auxItem.setInput('loading', true);
      })
    }
    this.cdr.detectChanges();
  }

  fetchPage = async () => {
    if (this.fetch) {
      this.fetchLoadingPage();
      const sort = this.sortedColumn.sort ? `${this.sortedColumn.sort}${this.sortedColumn.name}` : ''

      this.rows = await this.fetch(this.paginator.pageIndex, this.paginator.pageSize, this.search, this.filtersValue, sort);
      this.loading = false;

      if (this.mode === 'component') {
        this.componentsContainer.clear();
        this.rows.items.forEach((row) => {
          const auxItem = this.componentsContainer.createComponent(this.rowComponent)
          Object.keys(row).forEach(att => {
            if(auxItem.instance.hasOwnProperty(att)) {
              auxItem.setInput(att, row[att]);
            }
          })
        })
      }
    }
  };

  ngAfterViewInit(): void {
    this.fetchPage();
    this.paginator.page
      .pipe(tap(() => this.fetchPage()))
      .subscribe()
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
      const columnField = column.field || ''
      return column.preRender
        ? column.preRender(row[columnField], row)
        : row[columnField]
  }

}
