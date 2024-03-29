import { Component, OnInit, inject, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { AuthService } from '@auth/services/auth.service';
import { User } from '@models/user';
import { ErrorService } from '@app/core/services/errors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-manager',
  templateUrl: './signup-manager.component.html',
  styleUrls: ['./signup-manager.component.scss'],
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
export class SignupManagerComponent implements OnInit{
  @Input() redirectTo = '';

  protected loading = false;
  page!: boolean;
  attributesForm!: UntypedFormGroup;
  authForm!: UntypedFormGroup;

  mobNumberPattern = /^[679]{1}[0-9]{8}$/;
  emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  protected authService = inject(AuthService);
  protected errorService = inject(ErrorService);
  private translate = inject(TranslateService);
  private router = inject(Router);

  ngOnInit(): void {
    this.page = false;

    this.attributesForm = new UntypedFormGroup({
      firstname: new UntypedFormControl('', [Validators.required]),
      lastname: new UntypedFormControl('', [Validators.required]),
      birthDate: new UntypedFormControl('', [Validators.required]),
      phone: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(this.mobNumberPattern),
      ]),
    });

    this.authForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      password: new UntypedFormControl('', [Validators.required]),
      confirmPassword: new UntypedFormControl('', [Validators.required]),
      acceptTerms: new UntypedFormControl(false, [(control) => control.value ? null : { requiredTerms: true }]),
    });
  }

  public signup = async () => {
    const { email, password, confirmPassword } = this.authForm.value;
    const manager = new User(
      '', email, password, "manager", 'es', this.attributesForm.value
    );

    this.loading = true;
    try {
      await this.authService.signup(manager, confirmPassword);
      this.router.navigateByUrl(this.redirectTo);
    } catch {
      Object.values(this.authForm.controls).forEach(control => {
        control.setErrors({ serverError: true });
      });
    }
    this.loading = false;
  }

  next() {
    Object.values(this.attributesForm.controls).forEach(control => {
      control.markAsTouched();
    });

    var err = null;
    if (this.attributesForm.valid) {
      this.page = true;
    } else {
      const controls = this.attributesForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          err = { field: name, error: Object.keys(controls[name].errors)[0]};
        }
      }
      this.errorService.setError({ name: err.error, field: this.translate.instant('user.' + err.field) });
    }
  }

  async finish() {
    Object.values(this.authForm.controls).forEach(control => {
      control.setErrors(null);
      control.updateValueAndValidity();
      control.markAsTouched();
    });

    if (this.authForm.valid) {
      await this.signup();
    } else {
      const controls = this.authForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          const err = { field: name, error: Object.keys(controls[name].errors)[0]};
          this.errorService.setError({ name: err.error, field: this.translate.instant('auth.' + err.field) });
        }
      }
    }
  }
}
