import { Component, Input, OnInit } from '@angular/core';

interface Column {
  field: string,
  name: string,
  title?: string,
  onClick?:Function,
  sortable?: boolean,
  sortableField?: string,
  preRender?: Function,
}

@Component({
  selector: 'angular-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class AngularTableComponent implements OnInit{
  @Input() columns: Column[] = [];
  @Input() fetch?: any;
  @Input() pageSize: number = 10;
  
  rows: { items: {[key: string]: any}[], total: number} = { items: [], total: 0};
  search: string = '';
  filtersValue: any = {};
  sortedColumn: {name: string, sort: string} = { name: '', sort: '' };
  actualPage = 0;
  loading: boolean = false;
  showFilters: boolean = false;

  fetchPage = async (page: number = this.actualPage) => {
    this.loading = true;
    if (this.fetch) {
      const sort = this.sortedColumn.sort ? `${this.sortedColumn.sort}${this.sortedColumn.name}` : ''
      this.rows = await this.fetch(page, this.pageSize, this.search, this.filtersValue, sort);
      this.loading = false;
      // if (typeof onFetch === 'function') {
      //   onFetch(response);
      // }
    }
  };

  sortTable = async (column: Column) => {
    const columnName = column.sortableField || column.field;
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
  };

  renderField = (row: any, column: Column) => {
    if (column.preRender) {
      return column.preRender(row[column.field], row)
    } 
    return row[column.field]
  }


  ngOnInit(): void {
    this.fetchPage(0);
  }
}
