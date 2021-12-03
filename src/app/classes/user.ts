import { Role } from '../interfaces/role';

export class User {
  id?: number;
  firstnameAndLastName: string;
  emailAddress: string;
  password: string;
  role: Role;
}
