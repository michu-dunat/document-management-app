import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials } from 'src/app/classes/login-credentials';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginCredentials: LoginCredentials = new LoginCredentials();

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.loginService.sendLogin(this.loginCredentials).subscribe(
      (response: any) => {
        this.loginService.setTokenAndRole(
          btoa(
            `${this.loginCredentials.emailAddress}:${this.loginCredentials.password}`
          ),
          response.code
        );
        this.router.navigate(['']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fastLogin() {
    this.loginCredentials.emailAddress = 'michu@gmail.com';
    this.loginCredentials.password = 'Useruseruser1';
    this.loginService
      .sendLogin(this.loginCredentials)
      .subscribe((response: any) => {
        this.loginService.setTokenAndRole(
          btoa(
            `${this.loginCredentials.emailAddress}:${this.loginCredentials.password}`
          ),
          response.code
        );
        this.router.navigate(['']);
      });
  }
}
