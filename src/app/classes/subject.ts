export class Subject {
    id?: number;
    firstNameLastName: string;
    position: string;

    constructor(firstNameLastName: string, position: string) {
        this.firstNameLastName = firstNameLastName;
        this.position = position;
    }
}
