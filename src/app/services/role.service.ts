import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  roleUrl = 'http://localhost:8080/role/';
  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get<Role[]>(this.roleUrl);
  }
}
