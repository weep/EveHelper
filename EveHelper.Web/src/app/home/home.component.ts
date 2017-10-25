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

  constructor(private eveapiService: EveapiService) {
    this.eveapiService.token().subscribe((data) => {
      this.account = data;
    });

  }

  ngOnInit() {
  }

  test() {
    debugger;
    this.eveapiService.get("alliances").subscribe((data) => {
      this.account = data;
    });
  }

}
