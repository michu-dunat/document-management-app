import { AdverseParty } from './adverse-party';
import { Client } from './client';
import { Court } from './court';
import { ProceedingsSubject } from './proceedings-subject';

export class Case {
  id?: number;
  client: Client = new Client();
  court: Court = new Court();
  proceedingsSubject: ProceedingsSubject = new ProceedingsSubject();
  adverseParty: AdverseParty = new AdverseParty();
  status: string = 'W toku';
}
