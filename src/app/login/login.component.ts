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

  constructor(private auth: AuthService, private http: HttpClient, private _location: Location, private router: Router) { }

  ngOnInit() {
  }

  submit(email, password) {
    this.http.post("http://localhost:3000/login.json", {'login': email, 'password': password}).subscribe(i => this.auth.setUser(i["user"]))
    this.router.navigate(['/'])
  }
}
