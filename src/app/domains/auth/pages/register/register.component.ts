import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthValidators } from '@shared/utils/auth-validators';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@shared/services/auth-service/auth.service';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

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
      password: ['', [Validators.required, AuthValidators.validPassword], []],
      confirmPassword: ['', [Validators.required], []]

    }, {
      validators: [AuthValidators.matchPassword]
    });
  }

  saveRegister() {
    if(this.form.valid) {

      this.loading = true;

      console.group('saveRegister');
      console.log('this.form.value', this.form.value);
      console.groupEnd();

      const user: User = {
        email: this.form.value.email,
        password: this.form.value.password,
        created: new Date().toUTCString()
      };

      this.auth.registerUser(user).subscribe({
        next: (user: User) => {
          console.group('saveRegister');
          console.log('User', user);
          console.groupEnd();
          //alert('Succeed register');
          this.successMessage = true;
          setTimeout(() => {
            this.successMessage = false;
            this.router.navigateByUrl('');
            this.loading = false;
          }, 2000);
        },
        error: (error: Error) => {
          this.errorMessage = true;
          this.loading = false;
          setTimeout(() => {
            this.errorMessage = false;
          }, 5000);
          console.error('register.component.ts - saveRegister - error', error.message);
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
