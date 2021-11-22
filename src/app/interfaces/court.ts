import { Address } from './address';
import { Judge } from './judge';

export class Court {
  id?: number;
  type: string;
  address: Address = new Address();
  department: string;
  phoneNumber: string;
  electronicAddressForDelivery: string;
  judgingPanel: Judge[] = [];
}
