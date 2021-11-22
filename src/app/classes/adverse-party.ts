import { AdversePartyAttorney } from './adverse-party-attorney';
import { Client } from './client';

export class AdverseParty extends Client {
  adversePartyAttorney?: AdversePartyAttorney = new AdversePartyAttorney();
}
