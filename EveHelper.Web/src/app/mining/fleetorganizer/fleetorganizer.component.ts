import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fleetorganizer',
  templateUrl: './fleetorganizer.component.html',
  styleUrls: ['./fleetorganizer.component.css']
})
export class FleetorganizerComponent implements OnInit {
  private key: string;
  private joining: boolean = false;
  private items: any[];

  constructor() { 
    this.items = [];
  }

  ngOnInit() {
  }

  create() {
    this.key = this.UniqueKey;
  }

  leave() {
    this.key = "";
  }

  toggleJoin() {
    this.joining = !this.joining;
  }

  add(itemString: string) {    
    let items = itemString.replace(/\t+/, "\t").split(/\n/) as any[];
    for (let itemString of items) {
      let match = itemString.match(/(.*)\t(.*)\t(.*)\t(.*)\t(.*)/)
      
      let item = {
        name: match[1],
        amount: match[2],
        group: match[3],
        size: match[4],
        estValue: match[5]
      }

      this.items.push(item);

      console.log(item);
    }
  }

  get UniqueKey() {

    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(32)
        .substring(1);
    }

    return s4() + s4();
  }

}
