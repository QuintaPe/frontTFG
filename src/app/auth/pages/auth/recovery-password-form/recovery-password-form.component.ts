import { Component, OnInit, inject, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from '@auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ErrorService } from '@app/core/services/errors.service';
import { DialogService } from '@app/shared/components/dialog/dialog.service';
import { Router } from '@angular/router';
import { AUTH_ROUTES } from '@app/core/routes';

@Component({
  selector: 'app-recovery-password-form',
  templateUrl: './recovery-password-form.component.html',
  styleUrls: ['./recovery-password-form.component.scss'],
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
export class RecoveryPasswordFormComponent implements OnInit {
  @Input() token = '';
  public recoveryForm: UntypedFormGroup;
  protected loading = false;

  private translate = inject(TranslateService);
  protected authService = inject(AuthService);
  protected errorService = inject(ErrorService);
  private dialogService = inject(DialogService);
  private router = inject(Router);

  ngOnInit(): void {
    this.recoveryForm = new UntypedFormGroup({
      password: new UntypedFormControl('', [Validators.required]),
      confirmPassword: new UntypedFormControl('', [Validators.required]),
    });
  }

  //Login
  public recoveryPassword = async () => {
    Object.values(this.recoveryForm.controls).forEach(control => {
      control.setErrors(null);
      control.updateValueAndValidity();
      control.markAsTouched();
    });

    const { password, confirmPassword } = this.recoveryForm.value;
    if (this.recoveryForm.valid) {
      this.loading = true;
      try {
        await this.authService.recoveryPassword(this.token, password, confirmPassword);
        await this.dialogService.open('success', this.translate.instant('auth.recoveryPasswordSuccessfully'));
        this.router.navigateByUrl(AUTH_ROUTES.LOGIN.url);
      } catch {
        this.recoveryForm.get('password').setErrors({ serverError: true });
        this.recoveryForm.get('confirmPassword').setErrors({ serverError: true });
      }
      this.loading = false;
    } else {
      const controls = this.recoveryForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          const err = { field: name, error: Object.keys(controls[name].errors)[0]};
          this.errorService.setError({ name: err.error, field: this.translate.instant('auth.' + err.field) });
        }
      }
    }
  }
}
