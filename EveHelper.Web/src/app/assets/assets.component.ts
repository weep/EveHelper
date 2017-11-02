import { Component, OnInit } from '@angular/core';
import { EveapiService } from '../service/eveapi.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  private assets: any[];

  constructor(private eveapi: EveapiService) { }

  ngOnInit() {
  }

  refresh() {
    this.eveapi.get("characters/" + this.eveapi.character.CharacterID + "/assets/").subscribe((data: any[]) => {
      console.log(data);
      this.assets = data.slice(0, 10);
      this.eveapi.post("characters/" + this.eveapi.character.CharacterID + "/assets/names/", {
        "item_ids": this.assets.map(a => a.item_id)
      }).subscribe((names: any[]) => {
        names.map(x => Object.assign(x, this.assets.find(a => a.item_id == x.item_id)));
        console.log(names);
      });
    });
  }
}
