import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { AppInputComponent } from 'src/app/core/components/app-input/app-input.component';
import { BasicsConstance } from 'src/app/core/constants/basics-constance';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ILoginResponse } from 'src/app/core/models/auth/ILoginResponse';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AngularSvgIconModule, ButtonComponent, AppInputComponent],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  BasicConstants = BasicsConstance;
  private _formBuilder = inject(FormBuilder);
  private _authServices = inject(AuthService);
  private _router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    const { userName, password } = this.form.value;
    if (this.form.valid) {
      this._authServices.Login({ userName, password }).subscribe({
        next: (res) => {
          this.goToMain(res);
        },
      });
    }
  }

  goToMain(data: ILoginResponse) {
    localStorage.setItem(BasicsConstance.USER_TOKEN, data.token);
    localStorage.setItem(BasicsConstance.USER_ID , data.userId);
    localStorage.setItem(BasicsConstance.USER_DATA, JSON.stringify(data));
    this._router.navigate(['/users']);
  }
}
