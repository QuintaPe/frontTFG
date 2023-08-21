import {
  Component,
  Input,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '@shared/components/popup/popup.component';
import { CampingUnit } from '@app/core/models/campingUnit';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ErrorService } from '@app/core/services/errors.service';
import { InputTextComponent } from '@app/shared/components/inputs/input-text/input-text.component';

@Component({
  selector: 'app-create-camping-lodgings',
  templateUrl: './create-camping-lodgings.component.html',
  styleUrls: ['../../create-camping.component.scss'],
})
export class CreateCampingLodgingsComponent {
  @Input() camping: string = '';
  @Input() formArray!: FormArray;
  actualLodging!: any;
  page = 0;
  tableRefreshFlag = 0;

  @ViewChild('popupTemplate')
  popupTemplate!: TemplateRef<any>;

  protected translate = inject(TranslateService);
  protected dialog = inject(MatDialog);
  private formBuilder = inject(FormBuilder);
  protected errorService = inject(ErrorService);

  columns = [
    {
      name: this.translate.instant('common.name'),
      type: 'component',
      component: InputTextComponent,
      componentOutputs: () => {},
      componentInputs: (row: any) => ({
        control: row?.controls?.name,
      }),
    },
    {
      type: 'menu',
      width: 40,
      buttons: [
        {
          icon: 'delete',
          text: this.translate.instant('common.delete'),
          onClick: (id: string) => this.handleRemoveUnit(id),
        },
      ],
    },
  ];

  openLodgingModal(id: string | null = null) {
    this.page = 0;
    const lodging = id
      ? this.formArray.controls.find((lod) => lod.get('_id').value === id)
      : null;
    this.actualLodging = lodging || this.formBuilder.group({
      _id: [''],
      camping: [this.camping],
      type: ['', Validators.required],
      name: ['', Validators.required],
      feePerNight: ['', Validators.required],
      size: ['', Validators.required],
      capacity: ['', Validators.required],
      beds: this.formBuilder.group({
        single: ['', Validators.required],
        double: ['', Validators.required],
        bunk: ['', Validators.required],
      }),
      bathroom: this.formBuilder.group({
        toilets: ['', Validators.required],
        showers: ['', Validators.required],
        private: ['', Validators.required],
      }),
      units: [[
        this.formBuilder.group({
          name: [`${this.translate.instant('campsite.unit')} 1`],
          notes: [''],
          disabled: [false],
        })
      ], Validators.required],
    });

    this.dialog.open(PopupComponent, {
      data: {
        headerText: this.translate.instant('campsite.addLodging'),
        template: this.popupTemplate,
      },
      width: '80vw',
    });
  }

  checkPageErrors() {
    this.actualLodging.markAllAsTouched();
    let controls = this.actualLodging.controls;
    const fields = Object.keys(controls);
    const pageFields =
      this.page === 0 ? fields.filter((f) => f !== 'units') : ['units'];

    let invalidControlName = pageFields.find(
      (control) => controls[control].invalid
    );

    if (invalidControlName) {
      if (['beds', 'bathroom'].includes(invalidControlName)) {
        controls = this.actualLodging.get(invalidControlName).controls;
        invalidControlName = Object.keys(controls).find(
          (control: any) => controls[control].invalid
        );
      }
      this.errorService.setError({
        name: Object.keys(controls[invalidControlName].errors)[0],
        field: this.translate.instant('campsite.' + invalidControlName),
      });
    }

    return !invalidControlName;
  }

  nextPage() {
    if (this.checkPageErrors()) {
      this.page = 1;
    }
  }

  addCampingLodging() {
    if (this.checkPageErrors()) {
      const lodgingIndex = this.formArray.controls.findIndex(
        (control) => control.value._id === this.actualLodging.get('_id').value
      );
      if (lodgingIndex > -1) {
        this.formArray.at(lodgingIndex).setValue(this.actualLodging.value);
      } else {
        this.actualLodging.get('_id').setValue(`new.${Math.random()}`);
        this.formArray.push(this.actualLodging);
      }
      this.dialog.closeAll();
    }
  }

  deleteCampingLodging() {
    const lodging = this.formArray.controls.findIndex(
      (control) => control.value._id === this.actualLodging.get('_id').value
    );
    this.formArray.removeAt(lodging);
    this.dialog.closeAll();
  }

  handleAddUnit(number: number) {
    const unitsFormControl = this.actualLodging.get('units') as FormControl;
    const unitsArray = unitsFormControl.value;
    for (let i = 0; i < number; i++) {
      unitsArray.push(
        this.formBuilder.group({
          name: [`${this.translate.instant('campsite.unit')} ${unitsArray.length + 1}`],
          notes: [''],
          disabled: [false],
        })
      );
      unitsFormControl.setValue(unitsArray);
    }
  }

  handleRemoveUnit(id: string) {
    const unitsFormControl = this.actualLodging.get('units') as FormControl;
    const unitsArray = unitsFormControl.value as CampingUnit[];
    const indexToRemove = unitsArray.findIndex((unit) => unit._id === id);

    if (indexToRemove !== -1) {
      unitsArray.splice(indexToRemove, 1);
    }
    unitsFormControl.setValue(unitsArray);
  }

  handleGetUnits = () => ({
    items: this.actualLodging.get('units').getRawValue(),
    total: this.actualLodging.get('units').value.length,
  });
}
