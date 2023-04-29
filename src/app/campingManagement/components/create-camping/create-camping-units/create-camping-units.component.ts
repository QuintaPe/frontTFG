import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { Camping } from '@models/camping';
import { TranslateService } from '@ngx-translate/core';
import { CampingService } from '@app/camping/services/camping.service';
import { CampingUnit } from '@models/campingUnit';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '@shared/components/popup/popup.component';
import { cloneObject } from '@utils/functions';

@Component({
  selector: 'app-create-camping-units',
  templateUrl: './create-camping-units.component.html',
  styleUrls: ['../create-camping.component.scss']
})

export class CreateCampingUnitsComponent {
  @Input() camping !: Camping;
  @Output() campingChange = new EventEmitter<Camping>();
  actualUnit!: CampingUnit

  @ViewChild('popupTemplate')
  popupTemplate!: TemplateRef<any>;

  constructor(
    public campingService: CampingService,
    public translate: TranslateService,
    public dialog: MatDialog
  ) {
    console.log(this.camping);
  }

  openUnitModal(id:string | null = null) {
    const unit = id ? this.camping.units.find(unit => unit._id === id) : null;
    this.actualUnit = unit ? cloneObject(unit) : new CampingUnit();
    this.dialog.open(PopupComponent, {
      data: {
        headerText: this.translate.instant('camping.addUnit'),
        template: this.popupTemplate
      },
      width: '80vw',
    });
  }

  addCampingUnit() {
    if (this.actualUnit._id) {
      const unitIndex = this.camping.units.findIndex(unit => unit._id === this.actualUnit._id);
      this.camping.units[unitIndex] = this.actualUnit;
    } else {
      this.camping.units.push({
        ...this.actualUnit,
        _id: this.actualUnit._id || `new-${Date.now()}`,
      });
    }
    this.campingChange.emit(this.camping);
    this.dialog.closeAll();
  }

  deleteCampingUnit() {
    this.camping.units = this.camping.units.filter(unit => unit._id !== this.actualUnit._id);
    this.campingChange.emit(this.camping);
    this.dialog.closeAll();
  }
}
