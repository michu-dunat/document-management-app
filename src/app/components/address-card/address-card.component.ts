import { Component, Input, OnInit } from '@angular/core';
import { Address } from 'src/app/classes/address';

@Component({
  selector: 'app-address',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css'],
})
export class AddressCardComponent {
  @Input() title: string;
  @Input() address: Address = new Address();
}
