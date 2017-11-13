import { Component, OnInit } from '@angular/core';
import { EveapiService } from '../../service/eveapi.service';
import { Transaction } from '../../models/transaction';
import { DecimalPipe } from '@angular/common';
import { Transactionstats } from './transactionstats.module';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  private transactions: Transaction[];
  private trend: number;
  private stats;

  private pageIndex = 0;
  private pageCount = 20;

  constructor(private eveapi: EveapiService) { }

  ngOnInit() {
    this.refresh();
  }

  get buyAmount() {
    return this.transactions.filter(f => f.is_buy).reduce((sum, transaction) => {
      let transAmount = transaction.quantity * transaction.unit_price;
      return sum + transAmount;
    }, 0) / 1000000;
  }

  get sellAmount() {
    return this.transactions.filter(f => !f.is_buy).reduce((sum, transaction) => {
      let transAmount = transaction.quantity * transaction.unit_price;
      return sum + transAmount;
    }, 0) / 1000000;
  }

  refreshStatistics() {
    this.stats = new Transactionstats(this.transactions);
    console.log(this.stats);
  }

  refresh() {
    if (this.transactions) {
      this.eveapi.get("characters/" + this.eveapi.character.CharacterID + "/wallet/transactions?from_id=" + this.transactions[0].transaction_id).subscribe((data: Transaction[]) => {
        var trend = data.reduce((sum, transaction) => {
          let transAmount = transaction.quantity * transaction.unit_price;
          if (transaction.is_buy)
            transAmount = -transAmount;
          return sum + transAmount;
        }, 0) / 1000000;
        this.trend = trend;
        this.transactions = data;
        this.refreshStatistics();
      });
    }
    else{
      this.eveapi.get("characters/" + this.eveapi.character.CharacterID + "/wallet/transactions/").subscribe((data: Transaction[]) => {
        var trend = data.reduce((sum, transaction) => {
          let transAmount = transaction.quantity * transaction.unit_price;
          if (transaction.is_buy)
            transAmount = -transAmount;
          return sum + transAmount;
        }, 0) / 1000000;
        this.trend = trend;
        this.transactions = data;
        this.refreshStatistics();
      });
    }
  }

}
