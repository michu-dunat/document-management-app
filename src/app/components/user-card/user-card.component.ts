import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/classes/user';
import { Role } from 'src/app/interfaces/role';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() user: User = new User();
  roleList: Role[] = [];
  buttonText: string = 'Dodaj użytkownika';

  constructor(
    private roleService: RoleService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private userService: UserService
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

  sendUser() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Kontynuować?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.addUser(this.user).subscribe(
          (response) => {
            this.snackBar.open('Użytkownik został dodany', 'Zamknij');
          },
          (error) => {
            console.error(error);
            this.snackBar.open('Użytkownik nie został dodany!', 'Zamknij');
          }
        );
      }
    });
  }
}
