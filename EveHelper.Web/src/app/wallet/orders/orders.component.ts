import { Component, OnInit } from '@angular/core';
import { EveapiService } from '../../service/eveapi.service';
import { MarketOrder } from '../../models/market.order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private orders: MarketOrder[]

  constructor(private eveapi: EveapiService) {

    setInterval(() => this.canChange(), 100);
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    if (this.orders) {
      this.eveapi.get("characters/" + this.eveapi.character.CharacterID + "/orders?from_id=" + this.orders[0].order_id).subscribe((data: MarketOrder[]) => {
        console.log(data);
        this.orders = data;
      });
    }
    else {
      this.eveapi.get("characters/" + this.eveapi.character.CharacterID + "/orders/").subscribe((data: MarketOrder[]) => {
        console.log(data);
        this.orders = data;
      });
    }
  }

  canChange() {
    if (!this.orders)
      return;

    let expires = new Date()
    this.orders.map(order => {
      let expires = new Date(Date.parse(order.issued));
      expires.setMinutes(5);
      order.can_change = -(Date.now() - expires.getTime()) / 1000;
    });
  }

}
