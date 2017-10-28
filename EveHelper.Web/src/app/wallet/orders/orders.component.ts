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

  constructor(private eveapi: EveapiService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.eveapi.get("characters/" + this.eveapi.character.CharacterID + "/orders/").subscribe((data: MarketOrder[]) => {
      console.log(data);
      this.orders = data;
    });
  }

}
