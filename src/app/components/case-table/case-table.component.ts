import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaseForTable } from 'src/app/interfaces/case-for-table';
import { CaseService } from 'src/app/services/case.service';
import { CaseStatusChangeDialogComponent } from '../case-status-change-dialog/case-status-change-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-case-table',
  templateUrl: './case-table.component.html',
  styleUrls: ['./case-table.component.css'],
})
export class CaseTableComponent implements OnInit {
  caseList: CaseForTable[] = [];
  columnsToDisplay = [
    'label',
    'date',
    'status',
    'delete',
    'changeStatus',
    'edit',
  ];
  searchInput: string;

  constructor(
    private caseService: CaseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.caseService.getCasesForTable().subscribe((response) => {
      this.caseList = response;
    });
  }

  delete(aCase: CaseForTable) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Usunąć wybraną sprawę?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.caseService.deleteCase(aCase.id).subscribe(
          (response) => {
            if (response) {
              this.snackBar.open('Sprawa została usunięta', 'Zamknij');
              this.caseList = this.caseList.filter(
                (caseInList) => caseInList !== aCase
              );
            }
          },
          (error) => {
            this.snackBar.open('Sprawa nie została usunięta!', 'Zamknij');
            console.error(error);
          }
        );
      }
    });
  }

  changeStatus(aCase: CaseForTable) {
    const dialogRef = this.dialog.open(CaseStatusChangeDialogComponent, {
      data: { currentStatus: aCase.status },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.newCaseStatus !== aCase.status) {
        this.caseService
          .updateCaseStatus(aCase.id, result.newCaseStatus)
          .subscribe(
            (response) => {
              aCase.status = result.newCaseStatus;
              this.snackBar.open(
                'Status sprawy został zauktualizowany!',
                'Zamknij'
              );
            },
            (error) => {
              console.error(error);
              this.snackBar.open(
                'Status sprawy nie został zauktualizowany!',
                'Zamknij'
              );
            }
          );
      } else {
        this.snackBar.open('Wybrano ten sam status', 'Zamknij');
      }
    });
  }

  search() {
    console.log(this.searchInput);
    if (this.searchInput !== undefined) {
      this.caseService.searchCases(this.searchInput).subscribe((response) => {
        this.caseList = response;
      });
    }
  }
}
