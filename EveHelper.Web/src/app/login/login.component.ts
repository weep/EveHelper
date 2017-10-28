import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private characterData;
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isAuthorized() == false) {
      this.authorize();
    }
  }

  authorize() {
    this.authService.authorize();
  }

  logout() {
    this.authService.logout();
  }
}
