import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Address } from 'src/app/classes/address';

@Component({
  selector: 'app-address',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class AddressCardComponent {
  @Input() title: string;
  @Input() address: Address = new Address();
  @Input() parentName: string;
}
