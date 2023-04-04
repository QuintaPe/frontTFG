import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from './components/button/button.component';
import { PopupComponent } from './components/popup/popup.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { PanelComponent } from './components/panel/panel.component';
import { InputTextComponent } from './components/inputs/input-text/input-text.component';
import { InputSelectComponent } from './components/inputs/input-select/input-select.component';
import { RouterModule } from '@angular/router';
import { AngularTableComponent } from './components/table/table.component';
import { SpinnerComponent } from './components/table/spinner/spinner.component';
import { SpinnerDirective } from './components/table/spinner/spinner.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';
import { RowMenuComponent } from './components/table/rowMenu/row-menu.component';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { AvatarComponent } from './components/Avatar/avatar.component';
import { InputAvatarComponent } from './components/inputs/input-avatar/input-avatar.component';


@NgModule({
  declarations: [
    ButtonComponent,
    PopupComponent,
    DialogComponent,
    PanelComponent,
    PanelComponent,
    InputTextComponent,
    InputAvatarComponent,
    InputSelectComponent,
    AngularTableComponent, 
    RowMenuComponent,
    SpinnerComponent, 
    SpinnerDirective,
    FormatDatePipe,
    AvatarComponent,
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
  ],
  providers: [],
  exports: [ 
    CommonModule,
    ButtonComponent,
    PanelComponent,
    InputTextComponent,
    InputSelectComponent,
    InputAvatarComponent,
    DialogComponent,
    AngularTableComponent, 
    RowMenuComponent,
    SpinnerComponent, 
    SpinnerDirective,
    AvatarComponent,
    FormatDatePipe,
  ],
})
export class SharedModule {}