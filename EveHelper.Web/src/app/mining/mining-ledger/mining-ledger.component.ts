import { Component, OnInit } from '@angular/core';
import { EveapiService } from '../../service/eveapi.service';

@Component({
  selector: 'app-mining-ledger',
  templateUrl: './mining-ledger.component.html',
  styleUrls: ['./mining-ledger.component.css']
})
export class MiningLedgerComponent implements OnInit {
  private ledger: any[];

  constructor(private eapi: EveapiService) { }

  ngOnInit() {
    this.eapi.get(`/characters/${this.eapi.character.CharacterID}/mining/`).subscribe((data: any[]) => {
      this.ledger = data;
    });
  }

}
