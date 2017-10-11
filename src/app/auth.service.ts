import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
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
}
