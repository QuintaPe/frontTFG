import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SignupUserComponent } from './components/signup-user/signup-user.component';
import { SignupManagerComponent } from './components/signup-manager/signup-manager.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthComponent } from './components/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { PanelComponent } from '@shared/components/panel/panel.component';
import { InputTextComponent } from '@shared/components/inputs/input-text/input-text.component';
import { ButtonComponent } from '@shared/components/button/button.component';

@NgModule({
  declarations: [
    AuthComponent,
    SignupUserComponent,
    SignupManagerComponent,
		LoginFormComponent,
  ],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,

    PanelComponent,
    InputTextComponent,
    ButtonComponent,
  ],
})
export class AuthModule { }

