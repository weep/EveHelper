import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Character } from './models/character';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private authService: AuthService) {
    this.authService.character;
  }

  ngOnInit(){
    
  }

  login(){
    this.authService.authorize();
  }
}
