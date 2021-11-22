import { Address } from "./address";

export interface Client {
  id?: number;
  firstnameAndLastNameOrCompanyName: string;
  PESEL: string;
  NIP: string;
  REGON: string;
  KRS: string;
  phoneNumber: string;
  emailAddress: string;
  residenceOrRegisteredOfficeAddress: Address;
  mailingAddress?: Address;
}
