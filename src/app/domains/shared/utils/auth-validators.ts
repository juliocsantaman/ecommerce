import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

export class AuthValidators {


  static validPassword(control: AbstractControl) {
    const value = control.value;

    if (!containsNumber(value)) {
      return {
        invalid_password: true
      };
    }

    return null;
  }

  static matchPassword(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    }

    return { different_password: true };
  }



}

function containsNumber(value: string): boolean {
  return value.split('').find(v => isNumber(v)) !== undefined;
}

function isNumber(value: string): boolean {
  return !isNaN(parseInt(value, 10));
}
