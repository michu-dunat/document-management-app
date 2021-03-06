import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../classes/user';
import { UserNamesForDocumentSenderField } from '../interfaces/user-names-for-document-sender-field';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = `${environment.serverUrl}/user`;

  constructor(private http: HttpClient) {}

  addUser(user: User) {
    return this.http.post<any>(`${this.userUrl}/add`, user);
  }

  getUsers() {
    return this.http.get<User[]>(`${this.userUrl}/table`);
  }

  deleteUser(id: number) {
    return this.http.delete<any>(`${this.userUrl}/delete/${id}`);
  }

  getUser(id: number) {
    return this.http.get<any>(`${this.userUrl}/${id}`);
  }

  updateUser(user: User) {
    return this.http.put<any>(`${this.userUrl}/update`, user);
  }

  getUserNames() {
    return this.http.get<UserNamesForDocumentSenderField[]>(
      `${this.userUrl}/possible-document-senders`
    );
  }
}
