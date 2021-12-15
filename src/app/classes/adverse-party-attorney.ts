import { Address } from './address';

export class AdversePartyAttorney {
  id?: number;
  firstNameLastName: string;
  phoneNumber: string;
  title: string;
  residenceOrRegisteredOfficeAddress: Address = new Address();
  mailingAddress?: Address = new Address();
  emailAddress: string;
}
