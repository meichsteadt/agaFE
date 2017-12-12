import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ahoy',
  templateUrl: './ahoy.component.html',
  styleUrls: ['./ahoy.component.css']
})
export class AhoyComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
