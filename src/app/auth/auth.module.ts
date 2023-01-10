import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AuthComponent } from './pages/auth/auth.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '@guards/auth.guard';
import { NoAuthGuard } from '@guards/noauth.guard';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    SignupFormComponent,
		LoginFormComponent,
  ],
  imports: [
    ReactiveFormsModule, 
    FormsModule,
    TranslateModule,
    SharedModule
  ],
  providers: [
    AuthService, 
    AuthGuard,
    NoAuthGuard
  ],
})
export class AuthModule { }

