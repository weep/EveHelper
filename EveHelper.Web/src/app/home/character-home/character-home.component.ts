import { Component, OnInit } from '@angular/core';
import { EveapiService } from '../../service/eveapi.service';
import { AuthService } from '../../service/auth.service';
import jkwery from 'jquery/dist/jquery';

@Component({
  selector: 'app-character-home',
  templateUrl: './character-home.component.html',
  styleUrls: ['./character-home.component.css']
})
export class CharacterHomeComponent implements OnInit {
  private account;
  private data;
  private swaggerData;
  private characterData;

  private materials: any;
  private materialsNeedString: string;
  private materialsHaveString: string;

  private updatingAuth = false;
  private updatingCharacter = false;
  private fsData;

  constructor(private eveapiService: EveapiService, private authService: AuthService) {
    this.materials = {
      need: {},
      has: {},
      diff: {},
      times: 14
    };

    //example data
    this.materialsNeedString = `Tritanium	9196804	-	-
    Pyerite	2300067	-	-
    Mexallon	577072	-	-
    Isogen	143907	-	-
    Nocxium	35888	-	-
    Zydrine	16929	-	-
    Megacyte	4871	-	-
    Total:			0`;
    this.materialsHaveString = `Tritanium	54 678 120	Mineral			546 781,20 m3	274 484 162,40 ISK
    Pyerite	13 640 396	Mineral			136 403,96 m3	68 883 999,80 ISK
    Mexallon	3 295 369	Mineral			32 953,69 m3	235 388 207,67 ISK
    Isogen	976 080	Mineral			9 760,80 m3	46 968 969,60 ISK
    Zydrine	118 433	Mineral			1 184,33 m3	121 428 170,57 ISK
    Nocxium	71 776	Mineral			717,76 m3	24 712 476,80 ISK
    Megacyte	46 081	Mineral			460,81 m3	56 379 642,69 ISK`
  }

  ngOnInit() {
    this.character();
  }

  svartMagi(has, need, times) {
    console.log(has, need);
    this.materialsHaveString = has.trim();
    this.materialsNeedString = need.trim();

    this.materials.diff = {};

    for (let mat of this.materialsNeedString.split(/\r?\n/)) {
      var mats: string[] = mat.split(/\t/).splice(0, 2);
      var name: string = mats[0].replace(/\s+/g, "");
      var amount: number = parseInt(mats[1].replace(/\s+/g, "")) * times;
      this.materials["need"][name] = (this.materials[name] || 0) + amount;
    }
    for (let mat of this.materialsHaveString.split(/\r?\n/)) {
      var mats: string[] = mat.split(/\t/).splice(0, 2);
      var name: string = mats[0].replace(/\s+/g, "");
      var amount: number = parseInt(mats[1].replace(/\s+/g, ""));
      this.materials["has"][name] = (this.materials[name] || 0) + amount;
    }

    for (let key in this.materials.need) {
      let val: number = this.materials.need[key];
      let has: number = this.materials.has[key] || 0;
      if (has < val)
        this.materials.diff[key] = val - has;
    }

    var diffString: string = "";
    for (let key in this.materials.diff) {
      var amount: number = this.materials.diff[key];
      diffString += `${key} ${amount} - -\n`
    }
    
    this.materials.diffString = diffString;

    setTimeout(function () {
      var copyTextArea: any = document.querySelector("textarea.diffresult");
      copyTextArea.select();

      document.execCommand('copy');
    }, 10);
  }

  execGet(what: string) {
    what = what.replace("{character_id}", this.characterData.CharacterID);

    this.eveapiService.get(what).subscribe(data => {
      console.log(data);
      this.fsData = data;
    });
  }

  execPost(what: string) {
    console.log(what);
  }

  character() {
    this.characterData = this.eveapiService.character;
  }

}
