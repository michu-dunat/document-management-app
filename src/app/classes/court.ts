import { Address } from './address';
import { Entity } from './entity';

export class Court {
  id?: number;
  type: string;
  department: string;
  entities: Entity[] = [];
  phoneNumber: string;
  electronicAddressForDelivery: string;
  address: Address = new Address();
  emailAddress: string;
  caseSignature: string;
  unitType: string;
}
