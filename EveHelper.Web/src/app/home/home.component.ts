import { Component, OnInit } from '@angular/core';
import { EveapiService } from '../service/eveapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private account;
  private data;
  private swaggerData;
  private characterData;

  private updatingAuth = false;
  private updatingCharacter = false;
  private fsData;

  constructor(private eveapiService: EveapiService) {

  }

  ngOnInit() {
      this.character();
  }

  test() {
    this.eveapiService.get("alliances").subscribe((data) => {
      this.account = data;
    });
  }

  getSwaggerData() {
    this.eveapiService.get("swagger.json").subscribe(data => {
      console.log(data);
      this.swaggerData = data;
    });
  }

  character() {
    this.characterData = this.eveapiService.character;
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

}
