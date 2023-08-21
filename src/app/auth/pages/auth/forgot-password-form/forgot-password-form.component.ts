import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from '@auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ErrorService } from '@app/core/services/errors.service';
import { DialogService } from '@app/shared/components/dialog/dialog.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss'],
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
export class ForgotPasswordFormComponent implements OnInit {
  public loginForm: UntypedFormGroup;
  protected loading = false;

  private translate = inject(TranslateService);
  protected authService = inject(AuthService);
  protected errorService = inject(ErrorService);
  private dialogService = inject(DialogService);

  ngOnInit(): void {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.pattern(/^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    });
  }

  //Login
  public forgotPassword = async () => {
    Object.values(this.loginForm.controls).forEach(control => {
      control.setErrors(null);
      control.updateValueAndValidity();
      control.markAsTouched();
    });

    const { email } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.loading = true;
      try {
        await this.authService.forgotPassword(email);
        await this.dialogService.open('success', this.translate.instant('auth.recoveryPasswordSended'));
      } catch {
        this.loginForm.get('email').setErrors({ serverError: true });
      }
      this.loading = false;
    } else {
      const controls = this.loginForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          const err = { field: name, error: Object.keys(controls[name].errors)[0]};
          this.errorService.setError({ name: err.error, field: this.translate.instant('auth.' + err.field) });
        }
      }
    }
  }
}
