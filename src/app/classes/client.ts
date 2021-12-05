import { Address } from "./address";

export class Client {
  id?: number;
  firstNameLastNameCompanyName: string;
  phoneNumber: string;
  emailAddress: string;
  pesel: string;
  nip: string;
  regon: string;
  krs: string;
  residenceOrRegisteredOfficeAddress: Address = new Address();
  mailingAddress?: Address = new Address();
}
