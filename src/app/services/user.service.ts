import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = 'http://localhost:8080/user/';
  constructor(private http: HttpClient) {}

  addUser(user: User) {
    return this.http.post<any>(this.userUrl + 'add', user);
  }
}
