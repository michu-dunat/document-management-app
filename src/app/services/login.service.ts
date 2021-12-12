import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../classes/login-credentials';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  sendLogin(loginCredentials: LoginCredentials) {
    return this.http.post('http://localhost:8080/login', loginCredentials);
  }
}
