import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  user;
  emails: [''];
  constructor(private http: HttpClient, private auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser().subscribe(i => {
      this.user = new User(
        i["user"]["id"],
        i["user"]["bedroom_mult"],
        i["user"]["dining_mult"],
        i["user"]["seating_mult"],
        i["user"]["youth_mult"],
        i["user"]["occasional_mult"],
        i["user"]["home_mult"],
        i["user"]["show_sku"],
        i["user"]["show_prices"],
        i["user"]["round"],
        i["user"]["sort_by"]
      );
      this.emails = i["emails"];
    }, error => this.handleError());
  }

  handleError() {
    this.auth.resetToken();
  }

  update(user) {
    document.getElementById("info").innerHTML = ""
    this.userService.update(user);
    document.getElementById("info").innerHTML = "Settings updated successfully."
  }
}
