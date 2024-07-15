import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthValidators } from '@shared/utils/auth-validators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {
      
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, AuthValidators.validPassword], []],
      confirmPassword: ['', [Validators.required], []]

    }, {
      validators: [AuthValidators.matchPassword]
    });
  }

  saveRegister() {
    if(this.form.valid) {
      console.group('saveRegister');
      console.log('this.form.value', this.form.value);
      console.groupEnd();
      alert('Succeed register')
      this.router.navigateByUrl('');
    }
  }


}
