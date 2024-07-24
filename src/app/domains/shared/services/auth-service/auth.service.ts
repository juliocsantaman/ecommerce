import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Login, SignInToken, User } from '@shared/models/user.model';
import { URLS } from '../../../../../environments/urls';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  session = signal<any | null>(null);
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(URLS.registerUser, user);
  }

  login(user: Login): Observable<SignInToken> {
    return this.http.post<SignInToken>(URLS.login, user);
  }

  saveSession(user: SignInToken): void {
    this.session.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getSession(): SignInToken | null {
    const user = localStorage.getItem('user');

    if(user) {
      // console.group('getSession');
      // console.log('JSON.parse(user)', JSON.parse(user));
      // console.groupEnd();
      return JSON.parse(user);
    }

    return null;

  }

  signOut(): void {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  // Test, using token to access.
  getUserData(email: string): Observable<User> {
    let url = URLS.getUserData.replace('{email}', email);
    // Obtén el token desde un servicio de autenticación o almacenamiento seguro
    const user = this.getSession();

    // Configura los encabezados
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${user?.token}` // Añade el token en el encabezado
    });
    return this.http.get<User>(url, {headers});
  }

  

  

}
