import { Component, Input, OnInit } from '@angular/core';
import { Court } from 'src/app/classes/court';

@Component({
  selector: 'app-court-card',
  templateUrl: './court-card.component.html',
  styleUrls: ['./court-card.component.css']
})
export class CourtCardComponent implements OnInit {
  @Input() judgingPanelString: string;
  @Input() court: Court;

  constructor() { }

  ngOnInit(): void {
  }

}
