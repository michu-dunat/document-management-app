import { Component, Input, OnInit } from '@angular/core';
import { Judge } from 'src/app/classes/judge';

@Component({
  selector: 'app-judging-panel-card',
  templateUrl: './judging-panel-card.component.html',
  styleUrls: ['./judging-panel-card.component.css'],
})
export class JudgingPanelCardComponent {
  @Input() judgingPanel: Judge[] = [];
  firstnameAndLastName: string;

  addJudge() {
    this.judgingPanel.push(new Judge(this.firstnameAndLastName.trim()))
  }
}
