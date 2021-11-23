import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(
    private caseService: CaseService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  sendCase() {
    if (this.aCase.court.judgingPanel.length == 0) {
      this.snackBar.open('Skład sędziowski nie może być pusty!', 'Rozumiem', {
        duration: 3000,
      });
      return;
    }

    if (
      this.aCase.adverseParty!.adversePartyAttorney.mailingAddress!.city ==
      undefined
    ) {
      delete this.aCase.adverseParty!.adversePartyAttorney.mailingAddress;
    }
    if (this.aCase.adverseParty!.mailingAddress!.city == undefined) {
      delete this.aCase.adverseParty!.mailingAddress;
    }
    if (this.aCase.client.mailingAddress!.city == undefined) {
      delete this.aCase.client.mailingAddress;
    }
    if (
      this.aCase.adverseParty!.firstnameAndLastNameOrCompanyName == undefined
    ) {
      delete this.aCase.adverseParty;
    }

    this.caseService.addCase(this.aCase).subscribe((result) => {
      console.log(result);
    });

    console.log(this.aCase);
    
    this.router.navigate(['']);
  }
}
