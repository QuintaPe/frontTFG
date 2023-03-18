import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Camping } from '@models/camping';
import { TranslateService } from '@ngx-translate/core';
import { CampingService } from '@app/user/services/camping.service';
import { formatDate } from '@utils/functions';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '@app/shared/components/dialog/dialog.service';

@Component({
  selector: 'app-camping',
  templateUrl: './camping.component.html',
  styleUrls: ['./camping.component.scss']
})

export class CampingComponent implements OnInit {
   @ViewChild('container', { static: true, read: ViewContainerRef })
   public dynamicContainer!: ViewContainerRef;

  campings: Camping[] = [];
  totalCampings = 0;
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
    }
  ]

  constructor(
    public campingService: CampingService,
    public translate: TranslateService,
    private dialogService: DialogService
  ) {}

  getCampings = (page:any, size:any, search:any, filters:any, sort:any) => {
    return this.campingService.getCampings({ page, size, search, filters, sort })
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
