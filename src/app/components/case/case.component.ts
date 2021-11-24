import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdverseParty } from 'src/app/classes/adverse-party';
import { Case } from 'src/app/classes/case';
import { CaseService } from 'src/app/services/case.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
})
export class CaseComponent {
  buttonText: string = 'Załóż sprawę';
  aCase: Case = new Case();
  isAdversePartyPresent: boolean = false;

  constructor(
    private caseService: CaseService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  sendCase() {
    if (this.aCase.court.judgingPanel.length == 0) {
      this.snackBar.open('Skład sędziowski nie może być pusty!', 'Rozumiem', {
        duration: 3000,
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Kontynuować?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clearCaseObject();

        console.log(this.aCase);

        this.caseService.addCase(this.aCase).subscribe(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.error(error);
          }
        );

        this.router.navigate(['']);
      }
    });
  }

  clearCaseObject() {
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
  }
}
