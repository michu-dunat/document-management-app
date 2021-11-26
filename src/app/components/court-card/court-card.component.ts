import { Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Court } from 'src/app/classes/court';

@Component({
  selector: 'app-court-card',
  templateUrl: './court-card.component.html',
  styleUrls: ['./court-card.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class CourtCardComponent {
  @Input() court: Court;
  courtTypeList: string[] = ['Rejonowy', 'Okręgowy']
}
