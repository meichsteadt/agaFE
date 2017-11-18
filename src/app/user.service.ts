import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  url: string = "https://homelegance-kiosk.herokuapp.com";
  headers = new HttpHeaders({"Authorization": "Token token=" + this.auth.getToken()})
  constructor(private http: HttpClient, private auth: AuthService) { }

  getUser() {
    return this.http.get(this.url + "/users/" + this.auth.getUser(), {headers: this.headers})
  }

  update(user) {
    document.getElementById("info").innerHTML = ""
    this.http.put(this.url + "/users/" + this.auth.getUser(), {"bedroom_mult": parseFloat(user.bedroomMult), "dining_mult": parseFloat(user.diningMult), "seating_mult": parseFloat(user.seatingMult), "occasional_mult": parseFloat(user.occasionalMult), "youth_mult": parseFloat(user.youthMult), "home_mult": parseFloat(user.homeMult)}, {headers: this.headers}).subscribe(i => console.log(i))
  }
}
