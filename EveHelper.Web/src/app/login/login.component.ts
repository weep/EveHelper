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

  constructor(private authSerivce: AuthService) {
    this.code = this.authSerivce.getCode();
  }

  ngOnInit() {
    if (this.authSerivce.isAuthorized() == false) {
      this.authorize();
    }
  }

  authorize() {
    this.authSerivce.authorize();
  }

  logout() {
    this.authSerivce.setCode("");
  }

}
