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
  loading: Boolean = false;
  user!: User;

  constructor(
    public userService: UserService, 
    public authService: AuthService,
    public translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user ? JSON.parse(JSON.stringify(this.authService.user)) :  new User();
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
      this.loading = true;
      this.userService.putUser(this.user)
        .then((response) => {
          this.authService.user = response.user;
          this.translate.use(this.user.lang);
          localStorage.setItem('lang', this.user.lang);
          this.loading = false;
        })
        .catch((err) => console.log(err));
    }
  }
}
