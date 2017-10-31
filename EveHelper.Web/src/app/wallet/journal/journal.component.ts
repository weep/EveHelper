import { Component, OnInit } from '@angular/core';
import { EveapiService } from '../../service/eveapi.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
  private journal;

  constructor(private eveapi: EveapiService) { }

  ngOnInit() {
  }

  refresh() {
    if (this.journal) {
      this.eveapi.get("characters/" + this.eveapi.character.CharacterID + "/wallet/journal?from_id=" + this.journal[this.journal.length - 1].ref_id).subscribe((data) => {
        console.log(data);
        this.journal = data;
      });
    }
    else {
      this.eveapi.get("characters/" + this.eveapi.character.CharacterID + "/wallet/journal/").subscribe((data) => {
        console.log(data);
        this.journal = data;
      });
    }
  }
}
