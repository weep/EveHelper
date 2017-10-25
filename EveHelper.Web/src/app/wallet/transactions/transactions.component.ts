import { Component, OnInit } from '@angular/core';
import { EveapiService } from '../../service/eveapi.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  private transactions;
  constructor(private eveapi: EveapiService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.eveapi.get("characters/2019664422/wallet/transactions/").subscribe(data => {
      this.transactions = data;
    });
  }

}
