import { Component, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CampingService } from '@app/camping/services/camping.service';
import { formatDate } from '@utils/functions';
import { DialogService } from '@shared/components/dialog/dialog.service';
import { CampingRowComponent } from './camping-row/camping-row.component';

@Component({
  selector: 'app-camping',
  templateUrl: './camping.component.html',
  styleUrls: ['./camping.component.scss']
})

export class CampingComponent implements OnInit {
  campingRowType: Type<any> = CampingRowComponent
  columns = [
    {
      field: 'name',
      name: 'Nombre',
      sort: 'asc',
      sortable: true,
    },
    {
      field: 'createdAt',
      name: 'Fecha',
      sort: 'asc',
      sortable: true,
      preRender: (date: string) => formatDate(date),
    },
    {
      type: 'menu',
      width: 40,
      buttons: [{
        icon: 'person',
        text: 'Add',
        onClick: () => console.log('a'),
      },{
        icon: 'person_add',
        text: 'Edit',
        onClick: () => console.log('b'),
      },{
        icon: 'person_outline',
        text: 'Detele',
        onClick: () => console.log('c'),
      }],
    }
  ]

  constructor(
    public campingService: CampingService,
    public translate: TranslateService,
    private dialogService: DialogService,
  ) {}

  getCampings = async (page:any, size:any, search:any, filters:any, sort:any) => {
    return await this.campingService.getCampings({ page, size, search, filters, sort })
  }

  async openDialog() {
    const confirmed = await this.dialogService.open('Are you sure?', 'confirm');
    if (confirmed) {
      console.log('Ha aceptado!!');
    } else {
      console.log('Ha cancelado??');
    }
  }

  ngOnInit(): void {

  }
}
