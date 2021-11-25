import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { AdversePartyAttorney } from 'src/app/classes/adverse-party-attorney';

@Component({
  selector: 'app-adverse-party-attoreny-card',
  templateUrl: './adverse-party-attoreny-card.component.html',
  styleUrls: ['./adverse-party-attoreny-card.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class AdversePartyAttorenyCardComponent implements OnInit {
  @Input() adversePartyAttorney: any;
  @Input() isCaseForUpdating: boolean = false;
  isMailingAddressNeeded: boolean = false;
  constructor() {}

  ngOnInit(): void {
    if (this.isCaseForUpdating && this.adversePartyAttorney.mailingAddress) {
      this.isMailingAddressNeeded = true;
    }
  }
}
