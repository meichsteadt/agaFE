import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  getUser() {
    if(localStorage.getItem("user")) {
      return localStorage.getItem("user");
    }
    else if(this.readCookie(document.cookie)) {
      return this.readCookie(document.cookie);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setUser(user) {
    localStorage.setItem("user", user["id"]);
    localStorage.setItem("token", user["auth_token"]);
    document.cookie = "homeleganceUser="+user["id"];
  }

  resetToken() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  readCookie(cookie) {
    let res = cookie.split(";").filter(function(item) {
      return typeof item == 'string' && item.indexOf("homeleganceUser=") > -1;
    });
    if(res.length > 0) {
      return res[0].split("=")[1];
    }
    else {
      return false;
    }
  }
}
