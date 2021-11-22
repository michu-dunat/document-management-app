import { Component, Input, OnInit } from '@angular/core';
import { ProceedingsSubject } from 'src/app/classes/proceedings-subject';

@Component({
  selector: 'app-proceedings-subject-card',
  templateUrl: './proceedings-subject-card.component.html',
  styleUrls: ['./proceedings-subject-card.component.css'],
})
export class ProceedingsSubjectCardComponent {
  @Input() proceedingsSubject: ProceedingsSubject = new ProceedingsSubject();
  wasClaimReceived: boolean = false;

}
