import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { UserRoutingModule } from './user-routing.module';
import { PanelComponent } from '@shared/components/panel/panel.component';
import { CommonModule } from '@angular/common';
import { InputAvatarComponent } from '@shared/components/inputs/input-avatar/input-avatar.component';
import { InputTextComponent } from '@shared/components/inputs/input-text/input-text.component';
import { InputSelectComponent } from '@shared/components/inputs/input-select/input-select.component';
import { ButtonComponent } from '@shared/components/button/button.component';


@NgModule({
  declarations: [
    EditAccountComponent,
  ],
  imports: [
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    OverlayModule,
    MatIconModule,

    CommonModule,
    PanelComponent,
    InputAvatarComponent,
    InputTextComponent,
    InputSelectComponent,
    ButtonComponent,
  ],
})
export class UserModule { }
