import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EveapiService {

  private notClientIDAndSecret: string = "N2E5Y2YxNjRlMzdlNDJmNzk0ZDRlZDBmYmE4YTA1ZDk6SDdOMWVSUXVEUm95M2hXdzZpdzdFOUk0VTNvMWJsbllkaVpSN0lGTA==";

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  characters() {
    let params: HttpParams = new HttpParams();

    this.http.get("https://api.eveonline.com/account/characters.xml.aspx", { params: params }).subscribe(
      (response) => { console.log(response) },
      () => { console.log("complete"); }
    );
  }

  token() {
    //return this.authService.getCode();
    // let httpHeaders = new HttpHeaders();
    // httpHeaders.set("Authorization", "Bearer " + this.notClientIDAndSecret);

    return this.http.post("http://localhost:4201/api/token", {
      "code": this.authService.getCode()
    });
  }

  test() {
    this.http.get("https://login.eveonline.com/oauth/verify").subscribe((response) => {
      console.log(response);
    });
  }
}
