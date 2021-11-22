import { Address } from './address';

export class AdversePartyAttorney {
  id?: number;
  firstnameAndLastName: string;
  phoneNumber: string;
  residenceOrRegisteredOfficeAddress: Address = new Address();
  isAttorneyProfessional: boolean;
  jobTitle: string;
}
