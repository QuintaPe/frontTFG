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
  user: User = new User();
  email='';
  name='';
  lastName=''
  birthDate='';

  constructor(
    public userService: UserService, 
    public authService: AuthService,
    public translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.langs = this.translate.getLangs();
    const miId = this.authService.miId();
    console.log(miId)
    if (miId) {
      this.userService.getUser(miId).subscribe({
        next: (user) => {
          console.log(user)
          this.user = user
          this.email = user.email;
          this.name = user.name;
          this.lastName = user.lastName;
          this.birthDate = user.birthDate;
        },
        error: (err) => console.log(err),
      });
    }
  }

  changeLang = (lang: string) => {
    this.translate.use(lang);
  }

  updateProfile = () => {
    const updatedUser = {...this.user, name: this.name, lastName: this.lastName, birthDate: this.birthDate}
    if (this.user._id){
      console.log('act')
      this.userService.putUser(updatedUser).subscribe({
        next: (user) => {
          console.log(user)
        },
        error: (err) => console.log(err),
      });
    
    }
  }
}
