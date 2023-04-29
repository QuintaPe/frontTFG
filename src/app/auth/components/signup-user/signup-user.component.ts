import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { AuthService } from '@auth/services/auth.service';
import { User } from '@models/user';

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.scss'],
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
export class SignupUserComponent implements OnInit{
  page!: boolean;
  attributesForm!: UntypedFormGroup;
  authForm!: UntypedFormGroup;

  mobNumberPattern = /^[679]{1}[0-9]{8}$/;
  emailPattern = /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

  constructor(public authService: AuthService) {}

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
      username: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new UntypedFormControl('', [Validators.required]),
      password2: new UntypedFormControl('', [Validators.required]),
    });
  }

  public signup = async () => {
    const { email, password } = this.authForm.value;
    const user = new User(
      '', email, password, "user", 'es', this.attributesForm.value
    );

    await this.authService.signup(user);
  }

  next() {
    var err = '';
    if (this.attributesForm.valid) {
      this.page = true;
    } else {
      const controls = this.attributesForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          err = name;
        }
      }
      this.authService.setErrors([{ error: 'empty_data', message: `El campo ${err} esta vacio o no es valido`}]);
    }
  }

  finish() {
    if (this.authForm.valid) this.signup();
    else {
      const controls = this.authForm.controls;
      this.authService.setErrors([]);
      for (const name in controls) {
        if (controls[name].invalid) {
          this.authService.setErrors([{ error: 'empty_data', message: name }]);
        }
      }
    }
  }
}