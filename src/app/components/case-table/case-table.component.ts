import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaseForTable } from 'src/app/interfaces/case-for-table';
import { CaseService } from 'src/app/services/case.service';
import { LoginService } from 'src/app/services/login.service';
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
  caseStatusDisplay: string = '---';
  statusOptions = ['---', 'W toku', 'Zakończona'];
  caseListCopy: CaseForTable[] = [];
  role: string | undefined = '';

  constructor(
    private caseService: CaseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.role$.subscribe((role) => {
      this.role = role;
    });
    this.getAllCases();
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
    if (this.searchInput !== undefined) {
      this.caseService.searchCases(this.searchInput).subscribe((response) => {
        this.caseList = response;
        this.caseListCopy = response;
        this.snackBar.open(
          'Ilość pasujących spraw: ' + response.length,
          'Zamknij'
        );
      });
    }
  }

  getAllCases() {
    this.caseService.getCasesForTable().subscribe((response) => {
      this.caseList = response;
      this.caseListCopy = response;
    });
  }

  resetSearchAndFilters() {
    this.searchInput = '';
    this.caseStatusDisplay = '---';
    this.getAllCases();
  }

  caseStatusDisplayChange() {
    this.caseList = this.caseListCopy;
    if (this.caseStatusDisplay === '---') {
      return;
    }
    this.caseList = this.caseList.filter(
      (caseInList) => caseInList.status === this.caseStatusDisplay
    );
  }
}
