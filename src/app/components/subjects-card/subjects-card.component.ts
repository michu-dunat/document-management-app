import { Component, Input } from '@angular/core';
import { Subject } from 'src/app/classes/subject';

@Component({
  selector: 'app-subjects-card',
  templateUrl: './subjects-card.component.html',
  styleUrls: ['./subjects-card.component.css'],
})
export class SubjectsCardComponent {
  @Input() subjects: Subject[] = [];
  positionList: string[] = [
    'Sędzia',
    'Aseror sądowy',
    'Referendarz sądowy',
    'Starszy referendarz sądowy',
    'Ławnik',
    'Mediator',
  ];
  firstNameLastName: string;
  position: string = 'Sędzia';

  addSubject() {
    this.subjects.push(
      new Subject(this.firstNameLastName.trim(), this.position)
    );
  }

  delete(subject: Subject) {
    const index = this.subjects.indexOf(subject, 0);
    if (index > -1) {
      this.subjects.splice(index, 1);
    }
  }
}
