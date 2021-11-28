export class Document {
  id?: number;
  type: string;
  addresseeOrSender: string;
  isIncoming: boolean = false;
  dateOfReceiptOrDispatch: Date;
  isResponseRequired?: boolean;
  deadlineForResponse?: Date;
  fileName: string;
  file: any[];
}
