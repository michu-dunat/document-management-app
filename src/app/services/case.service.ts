import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Case } from '../classes/case';
import { CaseForTable } from '../interfaces/case-for-table';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  casesUrl = `${environment.serverUrl}/case`;

  constructor(private http: HttpClient) {}

  addCase(aCase: Case) {
    return this.http.post<any>(`${this.casesUrl}/add`, aCase);
  }

  getCasesForTable() {
    return this.http.get<CaseForTable[]>(`${this.casesUrl}/table`);
  }

  deleteCase(id: number) {
    return this.http.delete<any>(`${this.casesUrl}/delete/${id}`);
  }

  updateCaseStatus(id: number, status: string) {
    return this.http.patch<any>(`${this.casesUrl}/status/${id}`, status);
  }

  getCase(id: number) {
    return this.http.get<any>(`${this.casesUrl}/${id}`);
  }

  updateCase(aCase: Case) {
    return this.http.put<any>(`${this.casesUrl}/update`, aCase);
  }

  searchCases(searchInput: string) {
    return this.http.get<CaseForTable[]>(
      `${this.casesUrl}/search/${searchInput}`
    );
  }
}
