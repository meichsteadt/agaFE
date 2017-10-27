import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  password;
  email;
  constructor(private auth: AuthService, private http: HttpClient, private _location: Location, private router: Router) { }

  ngOnInit() {
  }

  submit(email, password) {
    this.http.post("https://homelegance-kiosk.herokuapp.com/login.json", {'login': email, 'password': password}).subscribe(i => this.auth.setUser(i["user"]))
    this.router.navigate(['/user'])
  }

}
