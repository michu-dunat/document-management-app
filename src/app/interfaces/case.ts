import { AdverseParty } from './adverse-party';
import { Client } from './client';
import { Court } from './court';
import { ProceedingsSubject } from './proceedings-subject';

export interface Case {
  id?: number;
  client: Client;
  court: Court;
  proceedingsSubject: ProceedingsSubject;
  adverseParty?: AdverseParty;
}
