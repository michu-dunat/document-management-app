import { Component, Input, OnInit } from '@angular/core';
import { Address } from 'src/app/interfaces/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
  @Input() title: string;
  @Input() address: Address = new Address();
}
