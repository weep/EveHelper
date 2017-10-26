import { Component, OnInit } from '@angular/core';
import { EveapiService } from '../../service/eveapi.service';
import { Transaction } from '../../models/transaction';

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

  refresh() {
    this.eveapi.get("characters/2019664422/wallet/transactions/").subscribe((data: Transaction[]) => {
      var trend = data.reduce((sum, transaction) => {
        let transAmount = transaction.quantity * transaction.unit_price;
        if (!transaction.is_buy)
          transAmount = -transAmount;
        return sum + transAmount;
      }, 0);
      console.log(data);
      this.trend = trend;
      this.transactions = data;
    });
  }

}
