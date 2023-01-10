import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    UserComponent,
    EditAccountComponent,
  ],
  imports: [
    ReactiveFormsModule, 
    FormsModule,
    TranslateModule,
    SharedModule,
  ],
  providers: [AuthGuard],
  exports: [UserComponent],
})
export class UserModule { }
