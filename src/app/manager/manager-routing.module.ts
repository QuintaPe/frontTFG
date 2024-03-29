import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { MANAGER_ROUTES } from '@app/core/routes';
import { MyCampingsComponent } from './pages/camping/my-campings.component';
import { CreateCampingComponent } from './pages/create-camping/create-camping.component';
import { CampingManagementComponent } from './pages/camping-management/camping-management.component';
import { canExit } from '@app/core/guards/role.guard';
import { ManagerConversationsComponent } from './pages/manager-conversations/manager-conversations.component';
import { UserConversationComponent } from '@app/user/pages/user-conversation/user-conversation.component';

const {
  CAMPINGS,
  NEW_CAMPING,
  EDIT_CAMPING,
  VIEW_CAMPING,
  PROFILE,
  CONVERSATIONS,
  CONVERSATION,
} = MANAGER_ROUTES;


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../core/components/left-menu/left-menu.component').then((m) => m.LeftMenuComponent),
    children: [
      { path: CAMPINGS.path, component: MyCampingsComponent },
      { path: NEW_CAMPING.path, component: CreateCampingComponent, canDeactivate: [canExit] },
      { path: EDIT_CAMPING.path, component: CreateCampingComponent, canDeactivate: [canExit] },
      { path: VIEW_CAMPING.path, component: CampingManagementComponent },
      { path: PROFILE.path, component: EditAccountComponent },
      { path: CONVERSATIONS.path, component: ManagerConversationsComponent },
      { path: CONVERSATION.path, component: UserConversationComponent },
      { path: '**', redirectTo: CAMPINGS.path },
    ],
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class ManagerRoutingModule {  }
