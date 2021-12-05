import { Component, Input } from '@angular/core';
import { Judge } from 'src/app/classes/judge';

@Component({
  selector: 'app-judging-panel-card',
  templateUrl: './judging-panel-card.component.html',
  styleUrls: ['./judging-panel-card.component.css'],
})
export class JudgingPanelCardComponent {
  @Input() judgingPanel: Judge[] = [];
  firstNameLastName: string;

  addJudge() {
    this.judgingPanel.push(new Judge(this.firstNameLastName.trim()));
  }

  delete(judge: Judge) {
    const index = this.judgingPanel.indexOf(judge, 0);
    if (index > -1) {
      this.judgingPanel.splice(index, 1);
    }
  }
}
