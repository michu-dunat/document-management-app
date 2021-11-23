import { Component } from '@angular/core';
import { AdverseParty } from 'src/app/classes/adverse-party';
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

  ngOnInit() {
    if(this.isAdversePartyPresent) {
      this.aCase.adverseParty = new AdverseParty()
    }
  }

  sendCase() {
    // this.caseService.addCase(this.aCase).subscribe((result) => {
    //   console.log(result);
    // });
    console.log(Object.keys(this.aCase.adverseParty.mailingAddress).length);
    
  console.log(this.aCase.adverseParty);
      

    if(this.aCase.court.judgingPanel.length == 0) {
      console.log('EJ');
    }
    
    //console.log(this.aCase);
  }
}
