import { AdversePartyAttorney } from "./adverse-party-attorney";
import { Client } from "./client";

export interface AdverseParty extends Client {
    adversePartyAttorney?: AdversePartyAttorney
}
