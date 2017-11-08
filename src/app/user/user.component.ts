import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  emails: [''];
  headers = new HttpHeaders({"Authorization": "Token token=" + this.auth.getToken()})
  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit() {
    let response;
    this.http.get("https://homelegance-kiosk.herokuapp.com/users/" + this.auth.getUser(), {headers: this.headers}).subscribe(i =>
      {
        this.user = new User(i["user"]["id"], i["user"]["bedroom_mult"], i["user"]["dining_mult"], i["user"]["seating_mult"], i["user"]["youth_mult"], i["user"]["occasional_mult"], i["user"]["home_mult"]);
        this.emails = i["emails"];
      },
      error => this.handleError()
    )
  }

  update(user) {
    document.getElementById("info").innerHTML = ""
    this.http.put("https://homelegance-kiosk.herokuapp.com/users/" + this.auth.getUser(), {"bedroom_mult": parseFloat(user.bedroomMult), "dining_mult": parseFloat(user.diningMult), "seating_mult": parseFloat(user.seatingMult), "occasional_mult": parseFloat(user.occasionalMult), "youth_mult": parseFloat(user.youthMult), "home_mult": parseFloat(user.homeMult)}, {headers: this.headers}).subscribe(i => console.log(i))
    document.getElementById("info").innerHTML = "Multipliers updated successfully."
  }

  handleError() {
    this.auth.resetToken();
  }

}
