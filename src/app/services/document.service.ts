import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Document } from '../classes/document';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentUrl = 'http://localhost:8080/document/';
  constructor(private http: HttpClient) {}

  addDocument(caseId: number, document: Document) {
    return this.http.post<any>(this.documentUrl + 'add/' + caseId, document, {
      observe: 'response',
    });
  }
}
