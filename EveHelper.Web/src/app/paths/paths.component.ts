import { Component, OnInit } from '@angular/core';
import { EveapiService } from '../service/eveapi.service';

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.css']
})
export class PathsComponent implements OnInit {
  private paths: any[];
  private pathsRaw: any[];
  private selectedPath: any;

  constructor(private eveapi: EveapiService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.eveapi.get("swagger.json").subscribe((data: any) => {
      console.log(data.paths);
      this.pathsRaw = data.paths;
      this.paths = Object.keys(data.paths);
    });
  }

  select(path: any) {
    let pathObject = this.pathsRaw[path];
    let keys = Object.keys(pathObject);
    this.selectedPath = pathObject;
    this.selectedPath["keys"] = keys;

    console.log(this.selectedPath);
  }

}
