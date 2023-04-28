import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from './components/button/button.component';
import { PopupComponent } from './components/popup/popup.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { PanelComponent } from './components/panel/panel.component';
import { InputTextComponent } from './components/inputs/input-text/input-text.component';
import { InputTextAreaComponent } from './components/inputs/input-text-area/input-text-area.component';
import { InputSelectComponent } from './components/inputs/input-select/input-select.component';
import { RouterModule } from '@angular/router';
import { AngularTableComponent } from './components/table/table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { RowMenuComponent } from './components/table/rowMenu/row-menu.component';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { AvatarComponent } from './components/Avatar/avatar.component';
import { InputAvatarComponent } from './components/inputs/input-avatar/input-avatar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { InputFileZoneComponent } from './components/inputs/input-file-zone/input-file-zone.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FileDragNDropDirective } from './components/inputs/input-file-zone/file-drag-drop.directive';
import { SkeletonComponent } from './components/skeleton/skeleton.component';

@NgModule({
  declarations: [
    ButtonComponent,
    PopupComponent,
    DialogComponent,
    PanelComponent,
    PanelComponent,
    InputTextComponent,
    InputTextAreaComponent,
    InputAvatarComponent,
    InputSelectComponent,
    InputFileZoneComponent,
    AngularTableComponent, 
    RowMenuComponent,
    AvatarComponent,
    LoaderComponent,
    FormatDatePipe,
    FileDragNDropDirective,
    SkeletonComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    TranslateModule,
    RouterModule,
    MatDialogModule,
    OverlayModule,
    PortalModule,
    A11yModule,
    MatIconModule,
    DragDropModule,
  ],
  providers: [],
  exports: [ 
    CommonModule,
    ButtonComponent,
    PanelComponent,
    PopupComponent,
    InputTextComponent,
    InputTextAreaComponent,
    InputSelectComponent,
    InputAvatarComponent,
    InputFileZoneComponent,
    DialogComponent,
    AngularTableComponent, 
    RowMenuComponent,
    AvatarComponent,
    LoaderComponent,
    FormatDatePipe,
    FileDragNDropDirective,
    SkeletonComponent,
  ],
})
export class SharedModule {}