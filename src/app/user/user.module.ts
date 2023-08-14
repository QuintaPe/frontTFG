import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { TranslateModule } from '@ngx-translate/core';

// Shared
import { PanelComponent } from '@shared/components/panel/panel.component';
import { InputAvatarComponent } from '@shared/components/inputs/input-avatar/input-avatar.component';
import { InputTextComponent } from '@shared/components/inputs/input-text/input-text.component';
import { InputSelectComponent } from '@shared/components/inputs/input-select/input-select.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TableComponent } from '@shared/components/table/table.component';
import { ProfileComponent } from '@shared/components/Profile/profile.component';
import { DialogService } from '@shared/components/dialog/dialog.service';
import { InputStarsComponent } from '@shared/components/inputs/input-stars/input-stars.component';
import { InputTextAreaComponent } from '@shared/components/inputs/input-text-area/input-text-area.component';
import { CampingRowComponent } from '@app/camping/components/camping-row/camping-row.component';

// Components
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { CampingsFavoritesComponent } from './pages/camping-favorites/campings-favorites.component';
import { UserBookingsComponent } from './pages/user-bookings/user-bookings.component';

// Routing module
import { UserRoutingModule } from './user-routing.module';
import { UserConversationsComponent } from './pages/user-conversations/user-conversations.component';
import { ConversationRowComponent } from './pages/user-conversations/conversation-row/conversation-row.component';
import { UserConversationComponent } from './pages/user-conversation/user-conversation.component';
import { AvatarComponent } from '@app/shared/components/Avatar/avatar.component';
import { SkeletonComponent } from '@app/shared/components/skeleton/skeleton.component';

@NgModule({
  declarations: [
    EditAccountComponent,
    UserBookingsComponent,
    CampingsFavoritesComponent,
    UserConversationsComponent,
    UserConversationComponent,
  ],
  imports: [
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    OverlayModule,
    MatIconModule,
    MatDialogModule,

    CommonModule,
    PanelComponent,
    InputAvatarComponent,
    InputTextComponent,
    InputSelectComponent,
    ButtonComponent,
    TableComponent,
    ProfileComponent,
    CampingRowComponent,
    InputStarsComponent,
    InputTextAreaComponent,
    ConversationRowComponent,
    AvatarComponent,
    SkeletonComponent,
  ],
  providers: [DialogService],
})
export class UserModule { }
