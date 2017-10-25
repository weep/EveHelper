import { Component, OnInit } from '@angular/core';
import { EveapiService } from '../service/eveapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EveapiService]
})
export class HomeComponent implements OnInit {
  private account;
  private data;
  private swaggerData;
  private characterData;

  private updatingAuth = false;
  private updatingCharacter = false;

  constructor(private eveapiService: EveapiService) {

  }

  apiAuth() {
    this.eveapiService.token().subscribe((data) => {
      this.account = data;
    });
  }

  ngOnInit() {
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
    this.eveapiService.character().subscribe(data => {
      console.log(data);
      this.characterData = data;

    });
  }

}
