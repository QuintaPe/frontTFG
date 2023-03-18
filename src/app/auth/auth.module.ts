import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthComponent } from './pages/auth/auth.component';
import { SignupUserComponent } from './components/signup-user/signup-user.component';
import { SignupManagerComponent } from './components/signup-manager/signup-manager.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SharedModule } from '@app/shared/shared.module';
import { NoAuthGuard } from '@guards/noauth.guard';

@NgModule({
  declarations: [
    AuthComponent,
    SignupUserComponent,
    SignupManagerComponent,
		LoginFormComponent,
  ],
  imports: [
    ReactiveFormsModule, 
    FormsModule,
    TranslateModule,
    SharedModule
  ],
  providers: [NoAuthGuard],
})
export class AuthModule { }

