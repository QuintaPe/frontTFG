import { Component, Input, inject, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '@shared/components/popup/popup.component';
import { CampingUnit } from '@app/core/models/campingUnit';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ErrorService } from '@app/core/services/errors.service';

@Component({
  selector: 'app-create-camping-lodgings',
  templateUrl: './create-camping-lodgings.component.html',
  styleUrls: ['../../create-camping.component.scss']
})

export class CreateCampingLodgingsComponent {
  @Input() camping: string = '';
  @Input() formArray !: FormArray;
  actualLodging!: any;
  page = 0;
  tableRefreshFlag = 0;
  columns: any = [];

  @ViewChild('popupTemplate')
  popupTemplate!: TemplateRef<any>;

  protected translate = inject(TranslateService);
  protected dialog = inject(MatDialog);
  private formBuilder = inject(FormBuilder);
  protected errorService = inject(ErrorService);

  setColumns = () => {
    this.columns = [
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
  }

  ngOnInit(): void {
    this.setColumns();
    this.translate.onLangChange.subscribe(() => this.setColumns());
  }

  openLodgingModal(id:string | null = null) {
    this.page = 0;
    const lodging = id ? this.formArray.controls.find((lod) => lod.get('_id').value === id) : null;
    this.actualLodging = lodging || this.formBuilder.group({
      _id: [''],
      camping: [this.camping],
      type: ['', Validators.required],
      name: ['', Validators.required],
      feePerNight: ['', Validators.required],
      size: ['', Validators.required],
      capacity: ['', Validators.required],
      units: [[], Validators.required],
    });

    this.dialog.open(PopupComponent, {
      data: {
        headerText: this.translate.instant('campsite.addLodging'),
        template: this.popupTemplate
      },
      width: '80vw',
    });
  }

  checkPageErrors() {
    const fields = Object.keys(this.actualLodging.controls)
    const pageFields = this.page === 0 ? fields.filter(f => f !== 'units') : ['units']
    const invalidControlName = pageFields.find(control => this.actualLodging.controls[control].invalid);
    this.actualLodging.markAllAsTouched();
    if (invalidControlName) {
      const invalidControl = this.actualLodging.controls[invalidControlName];
      const firstError = Object.keys(invalidControl.errors)[0];
      this.errorService.setError({ name: firstError, field: this.translate.instant('campsite.' + invalidControlName) });
      return false;
    }


    return true;
  }

  nextPage() {
    if(this.checkPageErrors()) {
      this.page = 1;
    }
  }

  addCampingLodging() {
    if(this.checkPageErrors()) {
      const lodgingIndex = this.formArray.controls.findIndex((control) => control.value._id === this.actualLodging.get('_id').value);
      if (lodgingIndex > -1) {
        this.formArray.at(lodgingIndex).setValue(this.actualLodging.value);
      } else {
        this.actualLodging.get('_id').setValue(`new.${Math.random()}`)
        this.formArray.push(this.actualLodging);
      }
      this.dialog.closeAll();
    }
  }

  deleteCampingLodging() {
    const lodging = this.formArray.controls.findIndex((control) => control.value._id === this.actualLodging.get('_id').value);
    this.formArray.removeAt(lodging);
    this.dialog.closeAll();
  }

  handleAddUnit() {
    const unitsFormControl = this.actualLodging.get('units') as FormControl;
    const unitsArray = unitsFormControl.value as CampingUnit[];
    const newUnitName = `Unidad ${unitsArray.length + 1}`;

    unitsArray.push(new CampingUnit({ name: newUnitName }));
    unitsFormControl.setValue(unitsArray);
  }

  handleRemoveUnit(id: string) {
    const unitsFormControl = this.actualLodging.get('units') as FormControl;
    const unitsArray = unitsFormControl.value as CampingUnit[];
    const indexToRemove = unitsArray.findIndex(unit => unit._id === id);

    if (indexToRemove !== -1) {
      unitsArray.splice(indexToRemove, 1);
    }
    unitsFormControl.setValue(unitsArray);
  }

  handleGetUnits = () => ({ items: this.actualLodging.get('units').value, total: this.actualLodging.get('units').value.length });
}
