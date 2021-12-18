import { AdverseParty } from './adverse-party';
import { Client } from './client';
import { Court } from './court';
import { Proceeding } from './proceeding';

export class Case {
  id?: number;
  client: Client = new Client();
  adverseParty: AdverseParty = new AdverseParty();
  proceeding: Proceeding = new Proceeding();
  court: Court = new Court();
  status: string = 'W toku';
}
