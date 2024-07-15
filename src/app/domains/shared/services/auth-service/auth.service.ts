import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Login, User } from '@shared/models/user.model';
import { URLS } from '../../../../../environments/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  session = signal<any | null>(null);
  private http = inject(HttpClient);

  constructor() { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(URLS.registerUser, user);
  }

  login(user: Login): Observable<User> {
    return this.http.post<User>(URLS.login, user);
  }

  saveSession(user: User): void {
    this.session.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getSession(): User | null {
    const user = localStorage.getItem('user');

    if(user) {
      // console.group('getSession');
      // console.log('JSON.parse(user)', JSON.parse(user));
      // console.groupEnd();
      return JSON.parse(user);
    }

    return null;

  }

  

}
