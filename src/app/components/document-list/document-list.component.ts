import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Document } from 'src/app/classes/document';
import { DocumentService } from 'src/app/services/document.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  caseId: number;
  documentList: Document[] = [];
  caseLabel: string | null;
  isAddButtonHidden: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      this.caseLabel = queryParams.get('caseLabel');
    });
    this.route.params.subscribe((param) => {
      this.caseId = param.caseId;
    });
    this.documentService.getDocumentsForCase(this.caseId).subscribe(
      (response) => {
        this.documentList = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  delete(document: Document) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Usunąć wybrany dokument?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.documentService.deleteDocument(<number>document.id).subscribe(
          (response) => {
            this.snackBar.open('Dokument została usunięty!', 'Zamknij', {
              duration: 3000,
            });
            this.documentList = this.documentList.filter(
              (documentInList) => documentInList !== document
            );
          },
          (error) => {
            this.snackBar.open(
              'Błąd, dokument nie został usunięty!',
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

  handleWhatHappenedWithNewDocument(info: string) {
    if (info === 'discarded') {
      this.documentList.pop();
    }
    this.isAddButtonHidden = false;
  }

  addNewDocument() {
    this.documentList.push(new Document());
    this.isAddButtonHidden = true;
  }
}
