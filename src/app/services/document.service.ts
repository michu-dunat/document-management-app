import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Document } from '../classes/document';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentUrl = 'http://localhost:8080/document';
  
  constructor(private http: HttpClient) {}

  addDocument(caseId: number, document: Document) {
    return this.http.post<any>(this.documentUrl + '/add/' + caseId, document);
  }

  getDocumentsForCase(caseId: number) {
    return this.http.get<Document[]>(`${this.documentUrl}/list/${caseId}`);
  }

  deleteDocument(documentId: number) {
    return this.http.delete<any>(`${this.documentUrl}/delete/${documentId}`);
  }

  updateDocument(document: Document) {
    return this.http.put<any>(`${this.documentUrl}/update`, document);
  }

  getFile(documentId: number) {
    return this.http.get<any>(`${this.documentUrl}/file/${documentId}`);
  }
}
