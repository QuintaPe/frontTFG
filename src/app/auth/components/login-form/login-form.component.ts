import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from '@auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

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
  public loginForm: UntypedFormGroup;
  protected loading = false;

  constructor(public authService: AuthService, private translate: TranslateService) {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: new UntypedFormControl('', [Validators.required]),
    });
  }

  //Login
  public login = async () => {
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
      console.log(control);
    });

    var user = this.loginForm.value;
    if (this.loginForm.valid) {
      this.loading = true;
      try {
        await this.authService.login(user.email, user.password);
      } catch {
        this.loginForm.get('email').setErrors({ serverError: true });
        this.loginForm.get('password').setErrors({ serverError: true });
      }
      this.loading = false;
    } else {
      const controls = this.loginForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          const err = { field: name, error: Object.keys(controls[name].errors)[0]};
          this.authService.setError({ name: err.error, field: this.translate.instant('auth.' + err.field) });
        }
      }
    }
  }
}
