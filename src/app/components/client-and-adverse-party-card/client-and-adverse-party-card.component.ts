import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { AdversePartyAttorenyCardComponent } from '../adverse-party-attoreny-card/adverse-party-attoreny-card.component';

@Component({
  selector: 'app-client-and-adverse-party-card',
  templateUrl: './client-and-adverse-party-card.component.html',
  styleUrls: ['./client-and-adverse-party-card.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class ClientAndAdversePartyCardComponent implements OnInit {
  @Input() title: string;
  @Input() data: any;
  @Input() isAdverseParty: boolean = false;
  @Input() isCaseForUpdating: boolean = false;
  isMailingAddressSameAsResidenceAddress: boolean = true;
  nameDistinguisher: string;
  @ViewChild('adversePartyAttorneyCard')
  adverseParyAttorneyCard: AdversePartyAttorenyCardComponent;

  ngOnInit() {
    this.nameDistinguisher = this.isAdverseParty ? 'adverseParty' : 'client';
    if (this.isCaseForUpdating && this.data.mailingAddress.city !== undefined) {
      this.isMailingAddressSameAsResidenceAddress = false;
    }
  }
}
