import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';

import { UserComponent } from './pages/user/user.component';


const routes: Routes = [
  { path: 'users' , component: UserComponent, canActivate: [AuthGuard]  },
  { path: 'edit-account' , component: EditAccountComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class UserRoutingModule {  }