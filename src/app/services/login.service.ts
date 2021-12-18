import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../classes/login-credentials';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl = `${environment.serverUrl}/login`;

  constructor(private http: HttpClient) {
    if (
      localStorage.getItem('token') !== null &&
      localStorage.getItem('role') !== null
    ) {
      this.tokenSource.next(<string>localStorage.getItem('token'));
      this.roleSource.next(<string>localStorage.getItem('role'));
    }
  }

  private tokenSource = new BehaviorSubject<string | undefined>(undefined);
  private roleSource = new BehaviorSubject<string | undefined>(undefined);

  token$ = this.tokenSource.asObservable();
  role$ = this.roleSource.asObservable();

  setTokenAndRole(token: string | undefined, role: string | undefined) {
    this.tokenSource.next(token);
    this.roleSource.next(role);
  }

  setTokenAndRoleToUndefined() {
    this.tokenSource.next(undefined);
    this.roleSource.next(undefined);
  }

  sendLogin(loginCredentials: LoginCredentials) {
    return this.http.post(this.loginUrl, loginCredentials);
  }

  updateLocalStorage(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }
}
