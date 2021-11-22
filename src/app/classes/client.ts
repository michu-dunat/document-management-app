import { Address } from "./address";

export class Client {
  id?: number;
  firstnameAndLastNameOrCompanyName: string;
  PESEL: string;
  NIP: string;
  REGON: string;
  KRS: string;
  phoneNumber: string;
  emailAddress: string;
  residenceOrRegisteredOfficeAddress: Address = new Address();
  mailingAddress: Address = new Address();
}
