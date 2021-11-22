import { Address } from './address';

export interface AdversePartyAttorney {
  id?: number;
  firstnameAndLastName: string;
  phoneNumber: string;
  residenceOrRegisteredOfficeAddress: Address;
  isAttorneyProfessional: boolean;
  jobTitle: string;
}
