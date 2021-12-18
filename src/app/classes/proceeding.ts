import { Entity } from './entity';

export class Proceeding {
  id?: number;
  value: string;
  isMediationPossible: boolean = true;
  basisForMediation?: string;
  otherEntities: Entity[] = [];
  comments?: string;
}
