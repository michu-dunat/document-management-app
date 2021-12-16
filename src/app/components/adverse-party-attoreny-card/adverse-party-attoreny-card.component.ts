import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-adverse-party-attoreny-card',
  templateUrl: './adverse-party-attoreny-card.component.html',
  styleUrls: ['./adverse-party-attoreny-card.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class AdversePartyAttorenyCardComponent implements OnInit {
  @Input() adversePartyAttorney: any;
  @Input() isCaseForUpdating: boolean = false;
  isMailingAddressSameAsResidenceAddress: boolean = true;
  jobTitleList: string[] = [
    'Adwokat',
    'Radca prawny',
    'Rzecznik patentowy',
    'Doradca restrukturyzacyjny',
    'Osoba sprawująca zarząd majątkiem lub interesami strony',
    'Osoba pozostająca ze stroną w stałym stosunku zlecenia',
    'Współuczestnik sporu',
    'Małżonek',
    'Rodzeństwo',
    'Zstępny strony',
    'Wstępny strony',
    'Osoba pozostająca ze stroną w stosunku przysposobienia',
    'Pracownik jednostki/organu nadrzędnego',
    'Przedstawiciel JST/organizacji mającej na celu idzelenie pomocy rodzinie',
    'Przedstawiciel organizacji zrzeszającej rolników indywidualnych',
    'Przedstawiciel organizacji konsumenckiej',
  ];

  ngOnInit(): void {
    if (
      this.isCaseForUpdating &&
      this.adversePartyAttorney.mailingAddress.city !== undefined
    ) {
      this.isMailingAddressSameAsResidenceAddress = false;
    }
  }
}
