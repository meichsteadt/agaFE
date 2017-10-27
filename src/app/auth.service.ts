import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  getUser() {
    return localStorage.getItem("user");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setUser(user) {
    localStorage.setItem("user", user["id"]);
    localStorage.setItem("token", user["auth_token"]);
  }

  resetToken() {
    localStorage.setItem("user", null);
    localStorage.setItem("token", null);
    this.router.navigate(['/login']);
  }
}
