import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email;
  password;
  user = this.auth.getUser();
  constructor(private auth: AuthService, private http: HttpClient, private _location: Location, private router: Router) { }

  ngOnInit() {
    console.log(user);
  }

  submit(email, password) {
    document.getElementById("error").style.display = "none";
    this.http.post("https://homelegance-kiosk.herokuapp.com/login.json", {'login': email, 'password': password}).subscribe(i => this.success(i), error => this.catchError(error))
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
