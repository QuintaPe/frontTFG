import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

// Shared
import { PanelComponent } from '@shared/components/panel/panel.component';
import { InputTextComponent } from '@shared/components/inputs/input-text/input-text.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DialogService } from '@app/shared/components/dialog/dialog.service';

// Components
import { SignupUserComponent } from './pages/auth/signup-user/signup-user.component';
import { SignupManagerComponent } from './pages/auth/signup-manager/signup-manager.component';
import { LoginFormComponent } from './pages/auth/login-form/login-form.component';
import { ForgotPasswordFormComponent } from './pages/auth/forgot-password-form/forgot-password-form.component';
import { RecoveryPasswordFormComponent } from './pages/auth/recovery-password-form/recovery-password-form.component';
import { AuthComponent } from './pages/auth/auth.component';

// Routing module
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    AuthComponent,
    SignupUserComponent,
    SignupManagerComponent,
		LoginFormComponent,
    ForgotPasswordFormComponent,
    RecoveryPasswordFormComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MatIconModule,
    MatDialogModule,

    PanelComponent,
    InputTextComponent,
    ButtonComponent,
  ],
  providers: [DialogService]
})
export class AuthModule { }

