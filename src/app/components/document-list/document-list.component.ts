import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Document } from 'src/app/classes/document';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  caseId: number;
  documentList: Document[] = [];
  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.caseId = param.caseId;
    });
    this.documentService.getDocumentsForCase(this.caseId).subscribe(
      (response) => {
        this.documentList = response;
        console.log(this.documentList);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
