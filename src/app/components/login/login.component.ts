import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginCredentials } from 'src/app/classes/login-credentials';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginCredentials: LoginCredentials = new LoginCredentials();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login() {
    this.loginService.sendLogin(this.loginCredentials).subscribe(
      (response: any) => {
        this.snackBar.open('Zalogowano pomyślnie', 'Zamknij');
        const token = btoa(
          `${this.loginCredentials.emailAddress}:${this.loginCredentials.password}`
        );
        this.loginService.updateSessionStorage(token, response.code);
        this.loginService.setTokenAndRole(token, response.code);
        this.router.navigate(['']);
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Nieprawidłowy login/hasło!', 'Zamknij');
      }
    );
  }

  fastLogin(isAdmin: boolean) {
    if (isAdmin) {
      this.loginCredentials.emailAddress = 'jan@gmail.com';
      this.loginCredentials.password = 'Useruseruser1';
    } else {
      this.loginCredentials.emailAddress = 'marta@gmail.com';
      this.loginCredentials.password = 'Useruseruser1';
    }

    this.login();
  }
}
