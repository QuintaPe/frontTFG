import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { UserComponent } from './pages/user/user.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserGuard } from '@guards/user.guard';
import { ManagerGuard } from '@guards/manager.guard';
import { CreateCampingComponent } from './components/create-camping/create-camping.component';
import { CampingComponent } from './components/camping/camping.component';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    UserComponent,
    EditAccountComponent,
    CampingComponent,
    CreateCampingComponent,
  ],
  imports: [
    ReactiveFormsModule, 
    FormsModule,
    TranslateModule,
    SharedModule,
    RouterModule,
    OverlayModule
  ],
  providers: [UserGuard, ManagerGuard],
  exports: [],
})
export class UserModule { }
