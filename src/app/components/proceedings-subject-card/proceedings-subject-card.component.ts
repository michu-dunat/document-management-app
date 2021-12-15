import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ProceedingsSubject } from 'src/app/classes/proceedings-subject';

@Component({
  selector: 'app-proceedings-subject-card',
  templateUrl: './proceedings-subject-card.component.html',
  styleUrls: ['./proceedings-subject-card.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class ProceedingsSubjectCardComponent {
  @Input() proceedingsSubject: ProceedingsSubject = new ProceedingsSubject();
  @Input() isCaseForUpdating: boolean = false;
  otherProceedingsSubjectTypeList: string[] = [
    'Prokurator',
    'Organizacja pozarządowa',
    'Inspektor pracy',
    'Powiatowy rzecznik konsumentów',
    'Miejski rzecznik konsumentów',
  ];

  ngOnInit() {}
}
