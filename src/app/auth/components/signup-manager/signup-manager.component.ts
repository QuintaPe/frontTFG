import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { AuthService } from '@auth/services/auth.service';
import { User } from '@models/user';

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
  @Input() setErrors = (error: string) => {}
  page!: boolean;
  attributesForm!: UntypedFormGroup;
  authForm!: UntypedFormGroup;

  mobNumberPattern = /^[679]{1}[0-9]{8}$/;
  emailPattern = /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

  constructor(
    public authService: AuthService, 
    public router: Router
  ) {}

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
    console.log(this.router)
  }

  public signup = async () => {
    const { email, password } = this.authForm.value;
    const manager = new User(
      '', email, password, "manager", 'es', this.attributesForm.value
    );

    try {
      const result = await this.authService.signup(manager);
      if (result) {
        this.router.navigate(['']);
      }
    } catch (error) {
      this.setErrors(`Error de registro. ${error}`);
    }

    this.authService.signup(manager).subscribe({
      next: (result) => {
        if (result) { 
          this.router.navigate(['']); 
        } else {
          this.setErrors('El nombre de usuario ya esta en uso');
        }
      },
      error: (error) => {
        this.setErrors(`Error de registro. ${error}`);
      },
    });
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
      this.setErrors(`El campo ${err} esta vacio o no es valido`);
    }
  }

  finish() {
    if (this.authForm.valid) this.signup();
    else {
      const controls = this.authForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) this.authService.alertError = name;
      }
    }
  }
}
