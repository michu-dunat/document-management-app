import { AdverseParty } from './adverse-party';
import { Client } from './client';
import { Court } from './court';
import { Proceeding } from './proceeding';

export class Case {
  id?: number;
  client: Client = new Client();
  court: Court = new Court();
  proceeding: Proceeding = new Proceeding();
  adverseParty: AdverseParty = new AdverseParty();
  status: string = 'W toku';
}
