import { Component } from '@angular/core';
import { Case } from 'src/app/classes/case';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
})
export class CaseComponent {
  buttonText: string = 'Załóż sprawę';
  aCase: Case = new Case();
  judgingPanelString: string;
  isAdversePartyPresent: boolean = false;

  constructor(private caseService: CaseService) {}

  sendCase() {
    // this.caseService.addCase(this.aCase).subscribe((result) => {
    //   console.log(result);
    // });
    if(this.aCase.court.judgingPanel.length == 0) {
      console.log('EJ');
      
    }
    
    console.log(this.aCase);
  }
}
