import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { Camping } from '@models/camping';
import { TranslateService } from '@ngx-translate/core';
import { CampingService } from '@app/user/services/camping.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-camping-photos',
  templateUrl: './create-camping-photos.component.html',
  styleUrls: ['../create-camping.component.scss']
})

export class CreateCampingPhotosComponent {
  @Input() camping !: Camping;
  @Output() campingChange = new EventEmitter<Camping>();

  constructor(
    public campingService: CampingService,
    public translate: TranslateService,
    public dialog: MatDialog
  ) {}
}
