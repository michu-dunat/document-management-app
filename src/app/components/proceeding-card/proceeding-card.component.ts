import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Proceeding } from 'src/app/classes/proceeding';

@Component({
  selector: 'app-proceedings-card',
  templateUrl: './proceeding-card.component.html',
  styleUrls: ['./proceeding-card.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class ProceedingCardComponent {
  @Input() proceeding: Proceeding = new Proceeding();
  @Input() isCaseForUpdating: boolean = false;
  positions: string[] = [
    'Prokurator',
    'Organizacja pozarządowa',
    'Inspektor pracy',
    'Powiatowy rzecznik konsumentów',
    'Miejski rzecznik konsumentów',
  ];
  basisForMediationList: string[] = ['Umowa o mediację', 'Postanowienie sądu'];

  ngOnInit() {}
}
