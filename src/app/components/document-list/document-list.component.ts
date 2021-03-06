import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Document } from 'src/app/classes/document';
import { DocumentService } from 'src/app/services/document.service';
import { LoginService } from 'src/app/services/login.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  caseId: number;
  documents: Document[] = [];
  caseLabel: string | null;
  isAddButtonHidden: boolean = false;
  role: string | undefined;
  caseStatus: string | null;
  isCaseFinished: boolean;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.role$.subscribe((role) => {
      this.role = role;
    });
    this.route.queryParamMap.subscribe((queryParams) => {
      this.caseLabel = queryParams.get('caseLabel');
      this.caseStatus = queryParams.get('caseStatus');
      this.isCaseFinished = this.caseStatus === 'Zakończona';
    });
    this.route.params.subscribe((param) => {
      this.caseId = param.caseId;
    });
    this.documentService.getDocumentsForCase(this.caseId).subscribe(
      (response) => {
        this.documents = response;
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
            this.snackBar.open('Dokument został usunięty', 'Zamknij');
            this.documents = this.documents.filter(
              (documentInArray) => documentInArray !== document
            );
          },
          (error) => {
            this.snackBar.open('Dokument nie został usunięty!', 'Zamknij');
            console.error(error);
          }
        );
      }
    });
  }

  handleWhatHappenedWithNewDocument(newDocument: Document) {
    this.documents.pop();
    if (newDocument.id != undefined) {
      this.documents.push(newDocument);
    }
    this.isAddButtonHidden = false;
  }

  addNewDocument() {
    this.documents.push(new Document());
    this.isAddButtonHidden = true;
  }
}
