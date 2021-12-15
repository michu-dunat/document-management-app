export class ProceedingsSubject {
  id?: number;
  value: string;
  isMediationPossible: boolean = true;
  comments?: string;
  otherProceedingsSubjectType?: string;
  otherProceedingsSubjectName?: string;
  basisForMediation?: string;
}
