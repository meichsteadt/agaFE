import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
// Import our authentication service
import { AuthService } from './auth.service';

@Injectable()
export class UserGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    if(!this.auth.getToken()) {
      this.router.navigate(['/user-login']);
      return false;
    }
    return true;
  }
}
