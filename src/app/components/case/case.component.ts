import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {
  buttonText: string = "Załóż sprawę";

  constructor() { }

  ngOnInit(): void {
  }

}
