import { Address } from './address';
import { Subject } from './subject';

export class Court {
  id?: number;
  type: string;
  department: string;
  subjects: Subject[] = [];
  phoneNumber: string;
  electronicAddressForDelivery: string;
  address: Address = new Address();
  emailAddress: string;
  caseSignature: string;
  unitType: string;
}
