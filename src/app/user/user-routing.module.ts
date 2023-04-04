import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAccountComponent } from './components/edit-account/edit-account.component';


const routes: Routes = [
  { 
    path: '', 
    component: EditAccountComponent, 
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class UserRoutingModule {  }