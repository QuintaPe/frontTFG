import { Component, Input, Output, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDateRangePicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '@app/auth/services/auth.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';
import 'moment/locale/es';
import { CommonModule } from '@angular/common';

const MY_FORMAT = {
  display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-input-date-range',
  templateUrl: './input-date-range.component.html',
  styleUrls: ['./input-date-range.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatMomentDateModule,
    CommonModule,
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT }
  ]
})
export class InputDateRangeComponent {
  @Input() class: string = '';
  @Input() preText: string = '';
  @Input() isDisabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() value: any = null;
  @Output() valueChange = new EventEmitter<any>();

  dateRange: FormGroup;
  @ViewChild(MatDateRangePicker) rangePicker: MatDateRangePicker<Date>;

  constructor(
    dateAdapter: DateAdapter<Date>,
    authService: AuthService,
    translate: TranslateService
  ) {
    const lang = authService.user?.lang || translate.getBrowserLang() || 'es';
    dateAdapter.setLocale(lang);
  }

  ngOnInit(): void {
    this.dateRange = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });

    if (this.value) {
      this.dateRange.patchValue({
        start: moment(this.value?.start || null, 'YYYY-MM-DD'),
        end: moment(this.value?.end || null, 'YYYY-MM-DD'),
      });
    }

    this.dateRange.valueChanges.subscribe((value) => {
      this.valueChange.emit({
        start: value?.start?.format('YYYY-MM-DD') || null,
        end: value?.end?.format('YYYY-MM-DD') || null,
      });
    });
  }

  openCalendar() {
    this.rangePicker.open();
  }
}
