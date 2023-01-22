import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@app/user/models/user';
import { UserService } from '@app/user/services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  langs: string[] = [];
  loading: Boolean = true;
  user: User = new User();
  email='';
  name='';
  lastName=''
  birthDate='';
  lang=''

  constructor(
    public userService: UserService, 
    public authService: AuthService,
    public translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.langs = this.translate.getLangs();
    const miId = this.authService.miId();
    if (miId) {
      this.userService.getUser(miId).subscribe({
        next: (user) => {
          this.user = user
          this.email = user.email;
          this.name = user.name;
          this.lastName = user.lastName;
          this.birthDate = user.birthDate;
          this.lang = user.lang;
          this.loading = false;
        },
        error: (err) => console.log(err),
      });
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
    const updatedUser = {...this.user, name: this.name, lastName: this.lastName, birthDate: this.birthDate, lang: this.lang}
    if (this.user._id){
      this.userService.putUser(updatedUser).subscribe({
        next: (user) => {
          console.log(updatedUser)
          this.translate.use(updatedUser.lang)
        },
        error: (err) => console.log(err),
      });
    
    }
  }
}
