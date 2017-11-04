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
  private groups: any[];
  private admin: boolean = false;

  private claims: any[];

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

  join(key: string) {
    this.key = key;
    this.toggleJoin();
  }

  toggleJoin() {
    this.joining = !this.joining;
  }

  toggleAdmin() {
    this.admin = !this.admin;
  }

  add(itemString: string) {
    let items = itemString.replace(/\t+/, "\t").split(/\n/) as any[];
    for (let itemString of items) {
      let match = itemString.match(/(.*)\t(.*)\t(.*)\t(.*)\t(.*)/);

      let item = {
        name: match[1],
        amount: parseFloat(match[2].replace(/\s/g, "")),
        group: match[3],
        size: match[4],
        estValue: parseFloat(match[5].replace(/\s/g,"").replace(/\sISK/g,"").replace(",","."))
      }
      console.log(item);

      this.items.push(item);
    }

    this.groups = this.group(this.items);
  }

  group(itemsArray: any[]) {
    var groups = {};
    for (let item of itemsArray) {
      if (!groups[item.group]) groups[item.group] = [];
      groups[item.group].push(item);
    }
    var array = [];
    for (let groupName in groups) {
      var items = groups[groupName] as any[];
      array.push({ name: groupName, items: groups[groupName], sum: items.reduce((sum, i) => { return sum + i.amount; }, 0) });
    }
    console.log(array);

    return array;
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
