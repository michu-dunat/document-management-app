import { Address } from "./address";

export class Client {
  id?: number;
  firstnameAndLastNameOrCompanyName: string;
  phoneNumber: string;
  emailAddress: string;
  PESEL: string;
  NIP: string;
  REGON: string;
  KRS: string;
  residenceOrRegisteredOfficeAddress: Address = new Address();
  mailingAddress: Address = new Address();
}
