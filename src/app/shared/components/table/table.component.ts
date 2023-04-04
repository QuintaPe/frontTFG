import { Component, Input, OnInit, Injector, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Column } from './table.interface';

@Component({
  selector: 'angular-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class AngularTableComponent implements OnInit{
  @Input() columns: Column[] = [];
  @Input() fetch?: any;
  @Input() pageSize: number = 10;
  @Input() mode: string = 'row';
  @Input() rowComponent!: Type<any>;
  
  rows: { items: {[key: string]: any}[], total: number} = { items: [], total: 0};
  search: string = '';
  filtersValue: any = {};
  sortedColumn: {name: string, sort: string} = { name: '', sort: '' };
  actualPage = 0;
  loading: boolean = false;
  showFilters: boolean = false;

  constructor() {}
  @ViewChild('componentsContainer', { read: ViewContainerRef }) 
  componentsContainer!: ViewContainerRef

  dataInjector(data: any) {
    const providers = Object.keys(data).map(att => ({
      provide: att, useValue: data[att]
    }))
    return Injector.create({ providers });
  }

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
    if (this.mode === 'component') {
      this.rows.items.forEach((row) => {
        const auxItem = this.componentsContainer.createComponent(this.rowComponent)
        Object.keys(row).forEach(att => {
          if(auxItem.instance.hasOwnProperty(att))
            auxItem.setInput(att, row[att]);
          })
      }
      )
    }
  };

  ngOnInit(): void {
    this.fetchPage(0);
  }

  sortTable = async (column: Column) => {
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
  };

  renderField = (row: any, column: Column) => {
      const columnField = column.field || '' 
      if (column.preRender) {
        return column.preRender(row[columnField], row)
      } 
      return row[columnField]
  }


  
}
