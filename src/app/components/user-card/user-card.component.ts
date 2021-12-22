import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/classes/user';
import { Role } from 'src/app/interfaces/role';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() user: User = new User();
  roles: Role[] = [];
  buttonText: string = 'Dodaj użytkownika';
  repeatedPassword: string;
  repeatedEmailAddress: string;
  shouldPasswordBeChanged: boolean = true;
  copiedPassword: string;
  userToken: string | undefined;

  constructor(
    private roleService: RoleService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.token$.subscribe((token) => {
      let decodedToken = atob(<string>token);
      if (decodedToken.split(':')[0] === this.user.emailAddress) {
        this.userToken = decodedToken;
      }
    });
    if (this.user.id !== undefined) {
      this.shouldPasswordBeChanged = false;
      this.buttonText = 'Aktualizuj dane użytkownika';
      this.copiedPassword = this.user.password;
      this.user.password = '';
    }
    this.roleService.getRoles().subscribe(
      (response) => {
        this.roles = response;
        if (this.user.id !== undefined) {
          this.roles.forEach((role) => {
            if (role.id === this.user.role.id) {
              this.user.role = role;
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
          this.userService.updateUser(this.user).subscribe(
            (response) => {
              this.snackBar.open('Użytkownik został zaktualizowany', 'Zamknij');
              if (this.userToken) {
                let newToken: string;
                if (this.user.password === '') {
                  newToken = btoa(
                    `${this.user.emailAddress}:${this.userToken.split(':')[1]}`
                  );
                } else {
                  newToken = btoa(
                    `${this.user.emailAddress}:${this.user.password}`
                  );
                }
                this.loginService.updateSessionStorage(newToken, 'ROLE_ADMIN');
                this.loginService.setTokenAndRole(newToken, 'ROLE_ADMIN');
              }
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
