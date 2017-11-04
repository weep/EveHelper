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
  private selectedPathName: string;
  private selectedPath: any;
  private selectedKeys: string[];

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
    this.selectedPathName = path;
    this.selectedPath = this.pathsRaw[path];
    this.selectedKeys = Object.keys(this.selectedPath);
    console.log(this.selectedKeys, this.selectedPath);
  }

}
