import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdverseParty } from 'src/app/classes/adverse-party';
import { Case } from 'src/app/classes/case';
import { CaseService } from 'src/app/services/case.service';
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

  @ViewChild(ProceedingsSubjectCardComponent) proceedingsSubjectCardComponent: ProceedingsSubjectCardComponent;

  constructor(
    private caseService: CaseService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log(this.isCaseForUpdating);
  }

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
        if (this.isCaseForUpdating) {
          this.cleanUp()
          console.log(this.aCase.proceedingsSubject);
          
          this.caseService.updateCase(this.aCase).subscribe(
            (result) => {
              console.log(result);
              this.snackBar.open(
                'Dane sprawy zostały zaktualizowane!',
                'Rozumiem',
                {
                  duration: 3000,
                }
              );
            },
            (error) => {
              console.error(error);
              this.snackBar.open(
                'Nie udało się zaktualizować danych sprawy!',
                'Rozumiem',
                {
                  duration: 3000,
                }
              );
            }
          );
        } else {
          this.clearCaseObject();

          console.log(this.aCase);

          this.caseService.addCase(this.aCase).subscribe(
            (result) => {
              console.log(result);
              this.snackBar.open(
                'Sprawa została zapisana w systemie!',
                'Rozumiem',
                {
                  duration: 3000,
                }
              );
            },
            (error) => {
              console.error(error);
              this.snackBar.open(
                'Nie udało się zapisać sprawy w systemie!',
                'Rozumiem',
                {
                  duration: 3000,
                }
              );
            }
          );
        }

        this.router.navigate(['']);
      }
    });
  }

  cleanUp() {
    if(this.proceedingsSubjectCardComponent.wasClaimReceived) {
      this.aCase.proceedingsSubject.fillingDate = undefined;
    } else {
      this.aCase.proceedingsSubject.claimReceiptDate = undefined;
    }
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
  }
}
