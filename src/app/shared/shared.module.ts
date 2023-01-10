import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AuthGuard } from '../../guards/auth.guard';
import { NoAuthGuard } from '../../guards/noauth.guard';
import { NavBarComponent } from '@app/shared/components/nav-bar/nav-bar.component';
import { HomeComponent } from '@app/shared/components/home/home.component';
import { ButtonComponent } from './components/button/button.component';
import { PopupComponent } from './components/popup/popup.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { PanelComponent } from './components/panel/panel.component';
import { InputTextComponent } from './components/inputs/input-text/input-text.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    ButtonComponent,
    PopupComponent,
    DialogComponent,
    PanelComponent,
    PanelComponent,
    InputTextComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    TranslateModule,
  ],
  providers: [
    AuthGuard,
    NoAuthGuard
  ],
  exports: [ 
    CommonModule,
    HomeComponent,
    NavBarComponent,
    ButtonComponent,
    PanelComponent,
    InputTextComponent,
  ],
})
export class SharedModule {}