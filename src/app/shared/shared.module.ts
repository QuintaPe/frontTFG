import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ButtonComponent } from './components/button/button.component';
import { PopupComponent } from './components/popup/popup.component';
import { DialogComponent } from './components/modal/modal.component';
import { PanelComponent } from './components/panel/panel.component';
import { InputTextComponent } from './components/inputs/input-text/input-text.component';
import { InputSelectComponent } from './components/inputs/input-select/input-select.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { RouterModule } from '@angular/router';
import { AngularTableComponent } from './components/table/table.component';
import { SpinnerComponent } from './components/table/spinner/spinner.component';
import { SpinnerDirective } from './components/table/spinner/spinner.directive';

@NgModule({
  declarations: [
    NavBarComponent,
    ButtonComponent,
    PopupComponent,
    DialogComponent,
    PanelComponent,
    PanelComponent,
    InputTextComponent,
    InputSelectComponent,
    LeftMenuComponent,
    AngularTableComponent, 
    SpinnerComponent, 
    SpinnerDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    TranslateModule,
    RouterModule,
  ],
  providers: [],
  exports: [ 
    CommonModule,
    NavBarComponent,
    ButtonComponent,
    PanelComponent,
    InputTextComponent,
    InputSelectComponent,
    DialogComponent,
    LeftMenuComponent,
    AngularTableComponent, 
    SpinnerComponent, 
    SpinnerDirective
  ],
})
export class SharedModule {}