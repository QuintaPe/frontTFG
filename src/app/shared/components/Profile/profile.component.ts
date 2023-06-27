import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { InputSelectComponent } from '../inputs/input-select/input-select.component';
import { ButtonComponent } from '../button/button.component';
import { InputTextComponent } from '../inputs/input-text/input-text.component';
import { InputAvatarComponent } from '../inputs/input-avatar/input-avatar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { User } from '@app/core/models/user';
import { UserService } from '@app/user/services/user.service';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
  standalone: true,
  imports: [
    InputAvatarComponent,
    InputTextComponent,
    InputSelectComponent,
    ButtonComponent,
    TranslateModule,
  ],
})

export class ProfileComponent {
  @Input() user !: User;
  @Output() userEdited = new EventEmitter();

  loading: boolean = false;
  langs: any = [];

  protected translate = inject(TranslateService);
  protected userService = inject(UserService);
  protected authService = inject(AuthService);

  async ngOnInit(): Promise<void> {
    this.langs = this.getLangs();
  }

  getLangs = () => {
    return this.translate.getLangs().map(lang => {
      console.log(lang);
      return { id: lang, name: this.translate.instant(`langs.${lang}`) };
    })
  }

  updateProfile = () => {
    if (this.user._id){
      this.loading = true;
      this.userService.putUser(this.user)
        .then((response) => {
          if (this.authService.user._id = this.user._id) {
            this.authService.user = response.user;
            this.translate.use(this.user.lang);
          }
          this.loading = false;
          this.langs = this.getLangs();
          this.userEdited.emit();
        })
        .catch((err) => {
          throw err;
        });
      }
    }
}
