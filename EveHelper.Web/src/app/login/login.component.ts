import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  private characterData;
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isAuthorized() == false) {
      this.authorize();
    }
    else{
      this.character();
    }
  }

  authorize() {
    this.authService.authorize();
  }

  logout() {
    this.authService.logout();
  }

  character() {
    this.authService.character().subscribe(data => {
      console.log(data);
      this.characterData = data;
    });
  }

}
