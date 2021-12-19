import { Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Entity } from 'src/app/classes/entity';

@Component({
  selector: 'app-entities-card',
  templateUrl: './entities-card.component.html',
  styleUrls: ['./entities-card.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class EntitiesCardComponent {
  @Input() entities: Entity[] = [];
  @Input() title: string = 'Podmioty występujące w obsłudze sprawy';
  @Input() positions: string[] = [
    'Sędzia',
    'Aseror sądowy',
    'Referendarz sądowy',
    'Starszy referendarz sądowy',
    'Ławnik',
    'Mediator',
  ];

  firstNameLastName: string;
  position: string;

  addEntity() {
    if (this.firstNameLastName === undefined || this.position === undefined)
      return;
    this.entities.push(
      new Entity(this.firstNameLastName.trim(), this.position)
    );
  }

  delete(entity: Entity) {
    const index = this.entities.indexOf(entity, 0);
    if (index > -1) {
      this.entities.splice(index, 1);
    }
  }
}
