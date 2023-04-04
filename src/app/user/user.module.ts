import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
    EditAccountComponent,
  ],
  imports: [
    UserRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    TranslateModule,
    SharedModule,
    RouterModule,
    OverlayModule,
    MatIconModule,
  ],
})
export class UserModule { }
