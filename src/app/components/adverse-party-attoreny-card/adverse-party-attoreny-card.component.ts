import { Component, Input, OnInit } from '@angular/core';
import { AdversePartyAttorney } from 'src/app/classes/adverse-party-attorney';

@Component({
  selector: 'app-adverse-party-attoreny-card',
  templateUrl: './adverse-party-attoreny-card.component.html',
  styleUrls: ['./adverse-party-attoreny-card.component.css']
})
export class AdversePartyAttorenyCardComponent implements OnInit {
  @Input() adversePartyAttorney: AdversePartyAttorney;
  constructor() { }

  ngOnInit(): void {
  }

}
