import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

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
  isMailingAddressNeeded: boolean = false;
  nameDistinguisher: string;
  
  constructor() {}
  
  ngOnInit() {
    this.nameDistinguisher = this.isAdverseParty ? "adverseParty" : "client";
    if(this.isCaseForUpdating && this.data.mailingAddress) {
      this.isMailingAddressNeeded = true;
    }
  }
}
