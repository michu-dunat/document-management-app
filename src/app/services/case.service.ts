import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Case } from '../classes/case';
import { CaseForTable } from '../interfaces/case-for-table';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  casesUrl = 'http://localhost:8080/case/';
  constructor(private http: HttpClient) {}

  addCase(aCase: Case) {
    return this.http.post<any>(this.casesUrl + 'add', aCase, {
      observe: 'response',
    });
  }

  getCasesForTable() {
    return this.http.get<CaseForTable[]>(this.casesUrl + 'table');
  }

  deleteCase(id: number) {
    return this.http.delete<any>(`${this.casesUrl}delete/${id}`);
  }

  updateCaseStatus(id: number, status: string) {
    return this.http.patch<any>(`${this.casesUrl}status/${id}`, status, {
      observe: 'response',
    });
  }

  getCase(id: number) {
    return this.http.get<any>(`${this.casesUrl}${id}`);
  }

  updateCase(aCase: Case) {
    return this.http.put<any>(`${this.casesUrl}update`, aCase);
  }
}
