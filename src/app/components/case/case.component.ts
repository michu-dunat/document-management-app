import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/classes/address';
import { Case } from 'src/app/classes/case';
import { Client } from 'src/app/classes/client';
import { Judge } from 'src/app/classes/judge';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
})
export class CaseComponent implements OnInit {
  buttonText: string = 'Załóż sprawę';
  aCase: Case = new Case();
  judgingPanelString: string;

  constructor(private caseService: CaseService) {}

  ngOnInit(): void {}

  sendCase() {
    let judgesAsStrings = this.judgingPanelString.split(',');
    judgesAsStrings = judgesAsStrings.map((judge) => judge.trim());
    judgesAsStrings.forEach((judge) => {
      let newJudge = new Judge();
      newJudge.firstnameAndLastName = judge;
      this.aCase.court.judgingPanel.push(newJudge);
    });

    this.caseService.addCase(this.aCase).subscribe((result) => {
      console.log(result);
    });

    console.log(this.aCase);
  }
}
