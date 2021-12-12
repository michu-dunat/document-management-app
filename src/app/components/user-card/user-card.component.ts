import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/classes/user';
import { Role } from 'src/app/interfaces/role';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SHA3, enc } from 'crypto-js';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EncryptionService } from 'src/app/services/encryption.service';

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
  shouldPasswordBeChanged: boolean = true;

  constructor(
    private roleService: RoleService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private encryptionService: EncryptionService
  ) {}

  ngOnInit(): void {
    if (this.user.id !== undefined) {
      this.shouldPasswordBeChanged = false;
      this.buttonText = 'Aktualizuj dane użytkownika';
    }
    this.roleService.getRoles().subscribe(
      (response) => {
        this.roleList = response;
        if (this.user.id !== undefined) {
          this.roleList.forEach((roleInList) => {
            if (roleInList.id === this.user.role.id) {
              console.log(roleInList.id);
              
              this.user.role = roleInList;
            }
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
    this.repeatedEmailAddress = this.user.emailAddress;
  }

  passwordEqualityCheck() {
    if (this.shouldPasswordBeChanged) {
      return this.user.password === this.repeatedPassword;
    } else {
      return true;
    }
  }

  emailAddressEqualityCheck() {
    return this.user.emailAddress === this.repeatedEmailAddress;
  }

  

  sendUser() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Kontynuować?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.user.id !== undefined) {
          if (this.shouldPasswordBeChanged) {
            this.user.password = this.encryptionService.hashPassowrd(this.user.password);
          }
          this.userService.updateUser(this.user).subscribe(
            (response) => {
              this.snackBar.open('Użytkownik został zaktualizowany', 'Zamknij');
              this.router.navigate(['']);
            },
            (error) => {
              console.error(error);
              this.snackBar.open(
                'Użytkownik nie został zaktualizowany!',
                'Zamknij'
              );
              this.user.password = this.repeatedPassword;
            }
          );
        } else {
          this.user.password = this.encryptionService.hashPassowrd(this.user.password);
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
      }
    });
  }
}
