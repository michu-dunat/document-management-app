import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Case } from '../interfaces/case';

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
}
