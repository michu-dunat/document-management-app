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

  getUsers() {
    return this.http.get<User[]>(this.userUrl + 'table');
  }

  deleteUser(id: number) {
    return this.http.delete<any>(`${this.userUrl}delete/${id}`);
  }

  getUser(id: number) {
    return this.http.get<any>(`${this.userUrl}${id}`);
  }

  updateUser(user: User) {
    return this.http.put<any>(`${this.userUrl}update`, user);
  }
}
