import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthValidators } from '@shared/utils/auth-validators';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@shared/services/auth-service/auth.service';
import { Login, User } from '@shared/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form!: FormGroup;
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
      console.group('login');
      console.log('this.form.value', this.form.value);
      console.groupEnd();

      const user: Login = {
        email: this.form.value.email,
        password: this.form.value.password
      };

      this.auth.login(user).subscribe({
        next: (user: User) => {
          console.group('login');
          console.log('User', user);
          console.groupEnd();
          alert('Succeed login');
          this.auth.saveSession(user);
          this.router.navigateByUrl('product-list');
        },
        error: (error: Error) => {
          console.error('login.component.ts - login - error', error.message);
        }
      });


    }
  }


}
