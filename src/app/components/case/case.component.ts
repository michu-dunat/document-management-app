import {
  ChangeDetectorRef,
  Component,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Address } from 'src/app/classes/address';
import { AdversePartyAttorney } from 'src/app/classes/adverse-party-attorney';
import { Case } from 'src/app/classes/case';
import { CaseService } from 'src/app/services/case.service';
import { ClientAndAdversePartyCardComponent } from '../client-and-adverse-party-card/client-and-adverse-party-card.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EntitiesCardComponent } from '../entities-card/entities-card.component';
import { ProceedingCardComponent } from '../proceeding-card/proceeding-card.component';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
})
export class CaseComponent {
  @Input() buttonText: string = 'Załóż sprawę';
  @Input() aCase: Case = new Case();
  @Input() isCaseForUpdating: boolean = false;

  @ViewChild(ProceedingCardComponent)
  proceedingsSubjectCardComponent: ProceedingCardComponent;
  @ViewChild('clientCard')
  clientCardComponent: ClientAndAdversePartyCardComponent;
  @ViewChild('adversePartyCard')
  adversePartyCardComponent: ClientAndAdversePartyCardComponent;

  @ViewChild('caseForm') caseForm: NgForm;

  constructor(
    private caseService: CaseService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewChecked() {
    if (this.aCase.status === 'Zakończona') {
      this.caseForm.form.disable();
      this.cdRef.detectChanges();
    }
  }

  ngOnInit() {
    
    if (this.isCaseForUpdating) {
      if (this.aCase.client.mailingAddress === null) {
        this.aCase.client.mailingAddress = new Address();
      }
      if (this.aCase.adverseParty.mailingAddress === null) {
        this.aCase.adverseParty.mailingAddress = new Address();
      }
      if (this.aCase.adverseParty.adversePartyAttorney === null) {
        this.aCase.adverseParty.adversePartyAttorney =
          new AdversePartyAttorney();
      } else if (
        this.aCase.adverseParty.adversePartyAttorney!.mailingAddress === null
      ) {
        this.aCase.adverseParty.adversePartyAttorney!.mailingAddress =
          new Address();
      }
    }
  }

  sendCase() {
    if (this.aCase.court.entities.length == 0) {
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
    if (this.clientCardComponent.isMailingAddressSameAsResidenceAddress) {
      this.aCase.client.mailingAddress = undefined;
    }
    if (this.adversePartyCardComponent.isMailingAddressSameAsResidenceAddress) {
      this.aCase.adverseParty.mailingAddress = undefined;
    }
    if (!this.adversePartyCardComponent.isAdversePartyAttorneyPresent) {
      this.aCase.adverseParty.adversePartyAttorney = undefined;
    } else if (
      this.adversePartyCardComponent.adverseParyAttorneyCard
        .isMailingAddressSameAsResidenceAddress
    ) {
      (<AdversePartyAttorney>(
        this.aCase.adverseParty.adversePartyAttorney
      )).mailingAddress = undefined;
    }
  }
}
