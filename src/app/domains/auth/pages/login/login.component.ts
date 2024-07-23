import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthValidators } from '@shared/utils/auth-validators';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@shared/services/auth-service/auth.service';
import { Login, SignInToken, User } from '@shared/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form!: FormGroup;
  warningMessage: boolean = false;
  successMessage: boolean = false;
  errorMessage: boolean = false;
  loading: boolean = false;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);
  

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, AuthValidators.validPassword], []]

    });
  }

  login() {
    if (this.form.valid) {
      this.loading = true;

      console.group('login');
      console.log('this.form.value', this.form.value);
      console.groupEnd();

      const user: Login = {
        email: this.form.value.email,
        password: this.form.value.password
      };

      this.auth.login(user).subscribe({
        next: (signInToken: SignInToken) => {
          console.group('login');
          console.log('User', signInToken);
          console.groupEnd();
          //alert('Succeed login');
          this.successMessage = true;
          setTimeout(() => {
            this.successMessage = false;
            this.auth.saveSession(signInToken);
            this.router.navigateByUrl('product-list');
            this.loading = false;
          }, 2000);
        },
        error: (error: Error) => {
          this.errorMessage = true;
          this.loading = false;
          setTimeout(() => {
            this.errorMessage = false;
          }, 5000);
          console.error('login.component.ts - login - error', error.message);
        }
      });


    }
  }

  showWarningMessage() {
    this.warningMessage = true;

    setTimeout(() => {
      this.warningMessage = false;
    }, 5000);
  }


}
