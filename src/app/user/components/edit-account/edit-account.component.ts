import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@models/user';
import { UserService } from '@app/user/services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})

export class EditAccountComponent implements OnInit {
  loading: Boolean = true;
  user: User = new User();

  constructor(
    public userService: UserService, 
    public authService: AuthService,
    public translate: TranslateService,
  ) {}

  ngOnInit(): void {
    const miId = this.authService.user._id;
    if (miId) {
      this.userService.getUser(miId)
        .then((user) => {
          this.user = user;
          this.loading = false;
        })
    }
  }

  getLangs = () => {
    return this.translate.getLangs().map(lang => {
      let traduct = '';
      this.translate
        .get(`langs.${lang}`)
        .subscribe(trad => { traduct = trad; })
      return { id: lang, name: traduct };
    })
  }

  updateProfile = () => {
    if (this.user._id){
      this.userService.putUser(this.user)
        .then(() => {
          this.translate.use(this.user.lang);
          localStorage.setItem('lang', this.user.lang);
        })
        .catch((err) => console.log(err));
    }
  }
}
