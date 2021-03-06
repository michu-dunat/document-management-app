import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'document-management-app';
  role: string | undefined;
  isAdminLoggedIn: boolean;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.loginService.role$.subscribe((role) => {
      this.role = role;
      this.isAdminLoggedIn = role === 'ROLE_ADMIN';
    });
  }

  logout() {
    localStorage.clear();
    this.loginService.setTokenAndRoleToUndefined();
    this.router.navigate(['']);
  }
}
