import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginCredentials } from '../classes/login-credentials';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private tokenSource = new Subject<string>();
  private roleSource = new Subject<string>();

  token$ = this.tokenSource.asObservable();
  role$ = this.roleSource.asObservable();

  setTokenAndRole(token: string, role: string) {
    this.tokenSource.next(token);
    this.roleSource.next(role);
  }

  setTokenAndRoleToUndefined() {
    this.tokenSource.next(undefined);
    this.roleSource.next(undefined);
  }

  sendLogin(loginCredentials: LoginCredentials) {
    return this.http.post('http://localhost:8080/login', loginCredentials);
  }
}
