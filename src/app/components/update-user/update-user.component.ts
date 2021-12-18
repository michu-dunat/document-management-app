import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  user: User;
  isUserLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userService.getUser(params['id']).subscribe((response) => {
        this.user = response;
        this.isUserLoaded = true;
      });
    });
  }
}
