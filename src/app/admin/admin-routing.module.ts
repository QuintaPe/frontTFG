import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCampingsComponent } from './pages/admin-campings/admin-campings.component';
import { AdminBookingsComponent } from './pages/admin-bookings/admin-bookings.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { ADMIN_ROUTES } from '@app/core/routes';
import { AdminConversationsComponent } from './pages/admin-conversations/admin-conversations.component';
import { UserConversationComponent } from '@app/user/pages/user-conversation/user-conversation.component';

const {
  CAMPINGS,
  BOOKINGS,
  USERS,
  PROFILE,
  CONVERSATIONS,
  CONVERSATION,
} = ADMIN_ROUTES;


const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../core/components/left-menu/left-menu.component').then((m) => m.LeftMenuComponent),
    children: [
      { path: CAMPINGS.path, component: AdminCampingsComponent },
      { path: BOOKINGS.path, component: AdminBookingsComponent },
      { path: USERS.path, component: AdminUsersComponent },
      { path: PROFILE.path, component: AdminProfileComponent },
      { path: CONVERSATIONS.path, component: AdminConversationsComponent },
      { path: CONVERSATION.path, component: UserConversationComponent },
      { path: '**', redirectTo: PROFILE.path },
    ],
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class AdminRoutingModule {  }
