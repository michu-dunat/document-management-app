import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaseForTable } from 'src/app/interfaces/case-for-table';
import { CaseService } from 'src/app/services/case.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-case-table',
  templateUrl: './case-table.component.html',
  styleUrls: ['./case-table.component.css'],
})
export class CaseTableComponent implements OnInit {
  caseList: CaseForTable[] = [];
  columnsToDisplay = ['label', 'date', 'delete'];

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
              this.snackBar.open('Sprawa został usunięty!', 'Zamknij', {
                duration: 3000,
              });
              this.caseList = this.caseList.filter(
                (caseInList) => caseInList !== aCase
              );
            }
          },
          (error) => {
            this.snackBar.open(
              'Błąd, sprawa nie została usunięta!',
              'Zamknij',
              {
                duration: 3000,
              }
            );
            console.error(error);
          }
        );
      }
    });
  }
}
