import { Component, OnInit } from '@angular/core';
import { EveapiService } from '../../service/eveapi.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-character-home',
  templateUrl: './character-home.component.html',
  styleUrls: ['./character-home.component.css']
})
export class CharacterHomeComponent implements OnInit {
  private account;
  private data;
  private swaggerData;
  private characterData;

  private updatingAuth = false;
  private updatingCharacter = false;
  private fsData;

  constructor(private eveapiService: EveapiService, private authService: AuthService) { }

  ngOnInit() {
    this.character();
  }

  execGet(what: string) {
    what = what.replace("{character_id}", this.characterData.CharacterID);

    this.eveapiService.get(what).subscribe(data => {
      console.log(data);
      this.fsData = data;
    });
  }

  execPost(what: string) {
    console.log(what);
  }

  character() {
    this.characterData = this.eveapiService.character;
  }

}
