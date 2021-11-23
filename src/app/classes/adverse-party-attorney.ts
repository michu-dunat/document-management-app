import { Address } from './address';

export class AdversePartyAttorney {
  id?: number;
  firstnameAndLastName: string;
  phoneNumber: string;
  isAttorneyProfessional: boolean;
  jobTitle: string;
  residenceOrRegisteredOfficeAddress: Address = new Address();
  mailingAddress: Address = new Address();
}
