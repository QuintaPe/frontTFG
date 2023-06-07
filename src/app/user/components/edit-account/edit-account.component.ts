import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@models/user';
import { UserService } from '@app/user/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { cloneObject } from '@utils/functions';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})

export class EditAccountComponent implements OnInit {
  loading: boolean = false;
  langs: { id: string; name: string; }[] = [];
  user!: User;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.user = cloneObject(this.authService.user);
    this.langs = this.getLangs();
  }

  getLangs = () => {
    return this.translate.getLangs().map(lang => {
      let trad = '';
      this.translate
        .get(`langs.${lang}`)
        .subscribe(v => { trad = v; })
      return { id: lang, name: trad };
    })
  }

  updateProfile = () => {
    if (this.user._id){
      this.loading = true;
      this.userService.putUser(this.user)
        .then((response) => {
          this.authService.user = response.user;
          this.translate.use(this.user.lang);
          localStorage.setItem('lang', this.user.lang);
          this.loading = false;
          this.langs = this.getLangs();
        })
        .catch((err) => {
          throw err;
        });
    }
  }
}
