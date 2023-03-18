import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  animations: [
    trigger('enterState', [
      state(
        'void',
        style({
          transform: 'translateY(-100%)',
          opacity: 0,
        })
      ),
      transition(':enter', [
        animate(
          300,
          style({
            transform: 'translateY(0)',
            opacity: 1,
          })
        ),
      ]),
    ]),
  ],
})
export class LoginFormComponent {
  @Input() setErrors = (error: string) => {};
  public loginForm: UntypedFormGroup;
  

  constructor(public authService: AuthService, public router: Router) {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required]),
    });
  }

  //Login
  public login = () => {
    var user = this.loginForm.value;
    if (user.email && user.password) {
      this.authService.login(user.email, user.password).subscribe({
        next: result => {
          if (result.success) {
            this.router.navigate(['/']);
          } else {
            this.setErrors(result.error);
          }
        },
        error: error => {
          this.setErrors(`Error de autenticación: ${error.error.message}`);
        }
    });
    } else {
      this.setErrors('Introduce todos los datos.');
    }
  }
}
