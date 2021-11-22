import { AdverseParty } from './adverse-party';
import { Client } from './client';
import { Court } from './court';
import { ProceedingsSubject } from './proceedings-subject';

export class Case {
  id?: number;
  client: Client;
  court: Court;
  proceedingsSubject: ProceedingsSubject;
  adverseParty: AdverseParty;

  constructor() {
    this.client = new Client();
    this.court = new Court();
    this.proceedingsSubject = new ProceedingsSubject();
    this.adverseParty = new AdverseParty();
  }
}
