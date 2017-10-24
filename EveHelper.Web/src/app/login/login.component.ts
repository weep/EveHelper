import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  private code: string;

  constructor(private authService: AuthService) {
    this.code = this.authService.getCode();
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
    this.authService.setCode("");
  }

}
