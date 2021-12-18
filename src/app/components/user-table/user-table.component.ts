import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  users: User[] = [];
  columnsToDisplay = [
    'firstNameLastName',
    'emailAddress',
    'role',
    'delete',
    'edit',
  ];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  delete(user: User) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Usunąć wybranego użytkownika?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(<number>user.id).subscribe(
          (response) => {
            this.snackBar.open('Użytkownik został usunięty', 'Zamknij');
            this.users = this.users.filter((userInList) => userInList !== user);
          },
          (error) => {
            this.snackBar.open('Użytkownik nie został usunięty!', 'Zamknij');
            console.error(error);
          }
        );
      }
    });
  }
}
