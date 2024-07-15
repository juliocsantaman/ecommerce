import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '@shared/models/user.model';
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

}
