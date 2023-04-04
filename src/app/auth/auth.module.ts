import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SignupUserComponent } from './components/signup-user/signup-user.component';
import { SignupManagerComponent } from './components/signup-manager/signup-manager.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SharedModule } from '@app/shared/shared.module';
import { AuthComponent } from './components/auth.component';
import { AuthRoutingModule } from './auth-routing.module';

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
    SharedModule
  ],
})
export class AuthModule { }

