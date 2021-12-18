import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  roleUrl = `${environment.serverUrl}/role`;
  
  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get<Role[]>(this.roleUrl);
  }
}
