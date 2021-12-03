import { Role } from '../interfaces/role';

export class User {
  id?: number;
  firstnameAndLastName: String;
  emailAddress: String;
  password: String;
  role: Role;
}
