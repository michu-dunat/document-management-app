import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/classes/user';
import { Role } from 'src/app/interfaces/role';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SHA3, enc } from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() user: User = new User();
  roleList: Role[] = [];
  buttonText: string = 'Dodaj użytkownika';
  repeatedPassword: string;
  repeatedEmailAddress: string;

  constructor(
    private roleService: RoleService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(
      (response) => {
        this.roleList = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  passwordEqualityCheck() {
    return this.user.password === this.repeatedPassword;
  }

  emailAddressEqualityCheck() {
    return this.user.emailAddress === this.repeatedEmailAddress;
  }

  hashPassowrd(plainText: string) {
    let hashedPassword = SHA3(plainText);
    for (let index = 0; index < 63999; index++) {
      hashedPassword = SHA3(hashedPassword);
    }
    let encodedPassword = hashedPassword.toString(enc.Hex);
    const charBeforeHash = String.fromCharCode(
      this.getRandomIntInclusive(97, 122)
    );
    const step = (charBeforeHash.charCodeAt(0) % 7) + 2;
    let hashedPasswordWithSalt: string = '';
    hashedPasswordWithSalt += charBeforeHash;
    for (let index = 0; index < encodedPassword.length; index++) {
      if (index % step == 0) {
        hashedPasswordWithSalt += String.fromCharCode(
          this.getRandomIntInclusive(97, 122)
        );
      }
      hashedPasswordWithSalt += encodedPassword[index];
    }
    return hashedPasswordWithSalt;
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  sendUser() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Kontynuować?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.user.password = this.hashPassowrd(this.user.password);
        this.userService.addUser(this.user).subscribe(
          (response) => {
            this.snackBar.open('Użytkownik został dodany', 'Zamknij');
            this.router.navigate(['']);
          },
          (error) => {
            console.error(error);
            this.snackBar.open('Użytkownik nie został dodany!', 'Zamknij');
            this.user.password = this.repeatedPassword;
          }
        );
      }
    });
  }
}
