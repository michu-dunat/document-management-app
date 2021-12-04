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
  userList: User[] = [];
  columnsToDisplay = [
    'firstnameAndLastName',
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
      this.userList = response;
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
            if (response) {
              this.snackBar.open('Użytkownik został usunięty', 'Zamknij');
              this.userList = this.userList.filter(
                (userInList) => userInList !== user
              );
            }
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
