import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Address } from 'src/app/classes/address';
import { Case } from 'src/app/classes/case';
import { CaseService } from 'src/app/services/case.service';
import { ClientAndAdversePartyCardComponent } from '../client-and-adverse-party-card/client-and-adverse-party-card.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ProceedingsSubjectCardComponent } from '../proceedings-subject-card/proceedings-subject-card.component';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
})
export class CaseComponent {
  @Input() buttonText: string = 'Załóż sprawę';
  @Input() aCase: Case = new Case();
  @Input() isCaseForUpdating: boolean = false;

  @ViewChild(ProceedingsSubjectCardComponent)
  proceedingsSubjectCardComponent: ProceedingsSubjectCardComponent;
  @ViewChild('clientCard')
  clientCardComponent: ClientAndAdversePartyCardComponent;
  @ViewChild('adversePartyCard')
  adversePartyCardComponent: ClientAndAdversePartyCardComponent;

  constructor(
    private caseService: CaseService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.isCaseForUpdating) {
      if (this.aCase.client.mailingAddress === null) {
        this.aCase.client.mailingAddress = new Address();
      }
      if (this.aCase.adverseParty.mailingAddress === null) {
        this.aCase.adverseParty.mailingAddress = new Address();
      }
      if (
        this.aCase.adverseParty.adversePartyAttorney.mailingAddress === null
      ) {
        this.aCase.adverseParty.adversePartyAttorney.mailingAddress =
          new Address();
      }
    }
  }

  sendCase() {
    if (this.aCase.court.judgingPanel.length == 0) {
      this.snackBar.open('Skład sędziowski nie może być pusty!', 'Zamknij');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Kontynuować?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cleanUp();
        console.log(this.aCase);

        if (this.isCaseForUpdating) {
          this.caseService.updateCase(this.aCase).subscribe(
            (result) => {
              this.snackBar.open(
                'Dane sprawy zostały zaktualizowane',
                'Zamknij'
              );
            },
            (error) => {
              console.error(error);
              this.snackBar.open(
                'Nie udało się zaktualizować danych sprawy!',
                'Zamknij'
              );
            }
          );
        } else {
          this.caseService.addCase(this.aCase).subscribe(
            (result) => {
              this.snackBar.open(
                'Sprawa została zapisana w systemie',
                'Zamknij'
              );
            },
            (error) => {
              console.error(error);
              this.snackBar.open(
                'Nie udało się zapisać sprawy w systemie!',
                'Zamknij'
              );
            }
          );
        }

        this.router.navigate(['']);
      }
    });
  }

  cleanUp() {
    if (this.proceedingsSubjectCardComponent.wasClaimReceived) {
      this.aCase.proceedingsSubject.fillingDate = undefined;
    } else {
      this.aCase.proceedingsSubject.claimReceiptDate = undefined;
    }
    if (!this.clientCardComponent.isMailingAddressNeeded) {
      this.aCase.client.mailingAddress = undefined;
    }
    if (!this.adversePartyCardComponent.isMailingAddressNeeded) {
      this.aCase.adverseParty.mailingAddress = undefined;
    }
    if (
      !this.adversePartyCardComponent.adverseParyAttorneyCard
        .isMailingAddressNeeded
    ) {
      this.aCase.adverseParty.adversePartyAttorney.mailingAddress = undefined;
    }
  }
}
