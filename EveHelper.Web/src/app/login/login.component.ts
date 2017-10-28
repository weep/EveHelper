import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { InternalapiService } from '../service/internal/internalapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  responseGetChar: {};
  private characterData;
  constructor(private authService: AuthService, private ias: InternalapiService) {
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

  getResponseGetChar(){
    this.ias.get("api/character/" + this.authService.character.CharacterID).subscribe(data => {
      this.responseGetChar = data;
      console.log(data);
    })
  }
}
