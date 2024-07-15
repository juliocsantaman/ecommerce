import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  session = signal<any | null>(null);

  constructor() { }
}
