import { Component, Input, inject, TemplateRef, ViewChild } from '@angular/core';
import { Camping } from '@models/camping';
import { TranslateService } from '@ngx-translate/core';
import { CampingLodging } from '@app/core/models/campingLodging';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '@shared/components/popup/popup.component';
import { cloneObject } from '@utils/functions';
import { CampingUnit } from '@app/core/models/campingUnit';

@Component({
  selector: 'app-create-camping-lodgings',
  templateUrl: './create-camping-lodgings.component.html',
  styleUrls: ['../../create-camping.component.scss']
})

export class CreateCampingLodgingsComponent {
  @Input() camping !: Camping;
  actualLodging!: CampingLodging
  page = 0;

  @ViewChild('popupTemplate')
  popupTemplate!: TemplateRef<any>;

  protected translate = inject(TranslateService);
  protected dialog = inject(MatDialog);

  columns = [
    {
      field: 'name',
      name: 'Nombre',
      sort: 'asc',
      sortable: true,
    },
    {
      field: 'notes',
      name: 'Notas',
      sort: 'asc',
      sortable: true,
      // preRender: (date: string) => `formatDate(date)`,
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
        text: 'Delete',
        onClick: (id:string) => this.handleRemoveUnit(id),
      }],
    }
  ];

  openLodgingModal(id:string | null = null) {
    const lodging = id ? this.camping.lodgings.find(lodging => lodging._id === id) : null;
    this.actualLodging = lodging ? cloneObject(lodging) : new CampingLodging();
    this.dialog.open(PopupComponent, {
      data: {
        headerText: this.translate.instant('camping.addLodging'),
        template: this.popupTemplate
      },
      width: '80vw',
    });
  }

  addCampingLodging() {
    const lodgingIndex = this.camping.lodgings.findIndex(lodging => lodging._id === this.actualLodging._id);
    if (lodgingIndex > -1) {
      this.camping.lodgings[lodgingIndex] = this.actualLodging;
    } else {
      this.camping.lodgings.push(this.actualLodging);
    }
    this.dialog.closeAll();
  }

  deleteCampingLodging() {
    this.camping.lodgings = this.camping.lodgings.filter(lodging => lodging._id !== this.actualLodging._id);
    this.dialog.closeAll();
  }

  handleAddUnit() {

    this.actualLodging.units.push(new CampingUnit({ name: `Unidad ${this.actualLodging.units.length + 1 }`}));
  }
  handleRemoveUnit(id: string) {
    this.actualLodging.units = this.actualLodging.units.filter(unit => unit._id !== id);
  }

  handleGetUnits = () => ({ items: this.actualLodging.units, total: this.actualLodging.units.length });
}
