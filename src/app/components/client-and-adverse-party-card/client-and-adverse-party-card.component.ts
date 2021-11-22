import { Component, Input, OnInit } from '@angular/core';
import { AdverseParty } from 'src/app/classes/adverse-party';
import { Client } from 'src/app/classes/client';

@Component({
  selector: 'app-client-and-adverse-party-card',
  templateUrl: './client-and-adverse-party-card.component.html',
  styleUrls: ['./client-and-adverse-party-card.component.css']
})
export class ClientAndAdversePartyCardComponent implements OnInit {
  @Input() title: string;
  @Input() data: Client | AdverseParty;

  constructor() { }

  ngOnInit(): void {
  }

}
