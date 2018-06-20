import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { isDevMode } from '@angular/core';
import { backendConfig } from './api-keys';

@Injectable()
export class UserService {
  headers = new HttpHeaders({"Authorization": "Token token=" + this.auth.getToken()})
  constructor(private http: HttpClient, private auth: AuthService) { }

  getUser() {
    return this.http.get(this.url() + "/users/" + this.auth.getUser(), {headers: this.headers})
  }

  update(user) {
    document.getElementById("info").innerHTML = ""
    this.http.put(this.url() + "/users/" + this.auth.getUser(), {
      "bedroom_mult": parseFloat(user.bedroomMult),
      "dining_mult": parseFloat(user.diningMult),
      "seating_mult": parseFloat(user.seatingMult),
      "occasional_mult": parseFloat(user.occasionalMult),
      "youth_mult": parseFloat(user.youthMult),
      "home_mult": parseFloat(user.homeMult),
      "show_sku": user.showSku,
      "show_prices": user.showPrices
    }, {headers: this.headers}).subscribe(i => console.log(i))
  }

  getShowSettings(id) {
    return this.http.get(this.url() + `/users/${id}/show_sku`)
  }

  url() {
    return isDevMode()? backendConfig.testUrl : backendConfig.url;
  }

  login(login, password) {
    return this.http.post(this.url() + "/login.json", {'login': login, 'password': password})
  }
}
