import { Address } from './address';
import { Judge } from './judge';

export interface Court {
  id?: number;
  type: string;
  address: Address;
  department: string;
  phoneNumber: string;
  electronicAddressForDelivery: string;
  judgingPanel: Judge[];
}
