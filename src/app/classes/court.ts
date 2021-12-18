import { Address } from './address';
import { Entity } from './entity';

export class Court {
  id?: number;
  type: string;
  department: string;
  unitType: string;
  phoneNumber: string;
  electronicAddressForDelivery: string;
  emailAddress: string;
  caseSignature: string;
  entities: Entity[] = [];
  address: Address = new Address();
}
