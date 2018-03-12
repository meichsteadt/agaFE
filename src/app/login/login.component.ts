import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  email;
  password;
  user = this.auth.getUser();
  constructor(private auth: AuthService, private http: HttpClient, private _location: Location, private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  submit(email, password) {
    document.getElementById("error").style.display = "none";
    this.userService.login(this.email, this.password).subscribe(i => this.success(i), error => this.catchError(error))
  }

  success(response) {
    this.auth.setUser(response["user"]);
    this.router.navigate(['/user']);
  }

  catchError(error) {
    console.log(error);
    document.getElementById("error").style.display = "block";
  }
}
