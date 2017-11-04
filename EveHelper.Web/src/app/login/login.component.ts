import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { InternalapiService } from '../service/internal/internalapi.service';
import { Character } from '../models/character';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  responseGetChar: {};

  private characterData: Character;
  private characters: Character[];
  constructor(private authService: AuthService, private ias: InternalapiService) {
  }

  ngOnInit() {
    this.characters = this.authService.characters;
  }

  authorize() {
    this.authService.authorize();
  }

  activate(char: Character){
    this.authService.switchCharacter(char);
  }

  remove(char: Character){
    this.authService.removeCharacter(char);
  }

  getResponseGetChar() {
    this.ias.get("api/character/" + this.authService.character.CharacterID).subscribe(data => {
      this.responseGetChar = data;
      console.log(data);
    })
  }
}
