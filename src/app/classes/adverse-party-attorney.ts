import { Address } from './address';

export class AdversePartyAttorney {
  id?: number;
  firstnameAndLastName: string;
  phoneNumber: string;
  isAttorneyProfessional: boolean = false;
  jobTitle: string;
  residenceOrRegisteredOfficeAddress: Address = new Address();
  mailingAddress?: Address = new Address();
}
