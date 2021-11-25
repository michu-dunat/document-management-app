import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Case } from 'src/app/classes/case';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-update-case',
  templateUrl: './update-case.component.html',
  styleUrls: ['./update-case.component.css'],
})
export class UpdateCaseComponent implements OnInit {
  case: Case;
  isCaseLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private caseService: CaseService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.caseService.getCase(params['id']).subscribe((response) => {
        this.case = response;
        this.isCaseLoaded = true;
      });
    });
  }
}
