import { User } from './user';

export class Document {
  id?: number;
  type: string;
  addresseeOrSender: string;
  isIncoming: boolean = false;
  methodOfReceipt?: string;
  dateOfReceiptOrDispatch: Date;
  dateOfLetter: Date;
  dateOfDelivery?: Date;
  isResponseRequired?: boolean;
  deadlineForResponse?: Date;
  fileName: string;
  file?: any[];
  comments?: string;
  sender?: User;
}
