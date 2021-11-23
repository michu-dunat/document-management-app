import { Address } from './address';
import { Judge } from './judge';

export class Court {
  id?: number;
  type: string;
  department: string;
  judgingPanel: Judge[] = [];
  phoneNumber: string;
  electronicAddressForDelivery: string;
  address: Address = new Address();
}
