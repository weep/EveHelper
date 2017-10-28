import { Component, OnInit } from '@angular/core';
import { EveapiService } from '../../service/eveapi.service';
import { Transaction } from '../../models/transaction';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  private transactions: Transaction[];
  private trend: number;
  constructor(private eveapi: EveapiService) { }

  ngOnInit() {
    this.refresh();
  }

  buyAmount() {
    return this.transactions.filter(f => f.is_buy).reduce((sum, transaction) => {
      let transAmount = transaction.quantity * transaction.unit_price;
      return sum + transAmount;
    }, 0) / 1000000;
  }

  sellAmount() {
    return this.transactions.filter(f => !f.is_buy).reduce((sum, transaction) => {
      let transAmount = transaction.quantity * transaction.unit_price;
      return sum + transAmount;
    }, 0) / 1000000;
  }

  refresh() {
    this.eveapi.get("characters/" + this.eveapi.character.CharacterID + "/wallet/transactions/").subscribe((data: Transaction[]) => {
      var trend = data.reduce((sum, transaction) => {
        let transAmount = transaction.quantity * transaction.unit_price;
        if (transaction.is_buy)
          transAmount = -transAmount;
        return sum + transAmount;
      }, 0) / 1000000;
      console.log(data);
      this.trend = trend;
      this.transactions = data;
    });
  }

}
