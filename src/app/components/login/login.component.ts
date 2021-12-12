import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials } from 'src/app/classes/login-credentials';
import { EncryptionService } from 'src/app/services/encryption.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginCredentials: LoginCredentials = new LoginCredentials();

  constructor(
    private loginService: LoginService,
    private encryptionService: EncryptionService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    const inputPassword = this.loginCredentials.password;
    this.loginCredentials.password = this.encryptionService.hashPassowrd(
      this.loginCredentials.password
    );
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
        this.loginCredentials.password = inputPassword;
      }
    );
  }
}
