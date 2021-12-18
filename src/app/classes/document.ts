import { User } from './user';

export class Document {
  id?: number;
  type: string;
  addresseeOrSender: string;
  isIncoming: boolean = false;
  dateOfReceiptOrDispatch: Date;
  dateOfLetter: Date;
  fileName: string;
  file?: any[];
  methodOfReceipt?: string;
  isResponseRequired?: boolean;
  deadlineForResponse?: Date;
  dateOfDelivery?: Date;
  sender?: User;
  comments?: string;
}
