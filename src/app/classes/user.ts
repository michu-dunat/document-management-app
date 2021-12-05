import { Role } from '../interfaces/role';

export class User {
  id?: number;
  firstNameLastName: string;
  emailAddress: string;
  password: string;
  role: Role;
}
