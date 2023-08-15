import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserBookingsComponent } from './pages/user-bookings/user-bookings.component';
import { CampingsFavoritesComponent } from './pages/camping-favorites/campings-favorites.component';
import { UserConversationsComponent } from './pages/user-conversations/user-conversations.component';
import { USER_ROUTES } from '@app/core/routes';
import { UserConversationComponent } from './pages/user-conversation/user-conversation.component';

const {
  PROFILE,
  BOOKINGS,
  FAVORITE_CAMPINGS,
  CONVERSATIONS,
  CONVERSATION,
} = USER_ROUTES;

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../core/components/left-menu/left-menu.component').then((m) => m.LeftMenuComponent),
    children: [
      { path: PROFILE.path, component: UserProfileComponent },
      { path: BOOKINGS.path, component: UserBookingsComponent },
      { path: FAVORITE_CAMPINGS.path, component: CampingsFavoritesComponent },
      { path: CONVERSATIONS.path, component: UserConversationsComponent },
      { path: CONVERSATION.path, component: UserConversationComponent },
      { path: '**', redirectTo: '/' },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class UserRoutingModule {  }
