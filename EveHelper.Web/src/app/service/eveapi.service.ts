import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AccessToken } from '../models/access-token';

import 'rxjs/Rx';

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

  token(): Observable<AccessToken> {
    //return this.authService.getCode();
    // let httpHeaders = new HttpHeaders();
    // httpHeaders.set("Authorization", "Bearer " + this.notClientIDAndSecret);

    return this.http.post<AccessToken>("http://localhost:4201/api/token", {
      "code": this.authService.getCode()
    }).map(token => {
      this.authService.setAccessToken(token);
      return token
    });
  }

  test() {
    this.http.get("https://login.eveonline.com/oauth/verify").subscribe((response) => {
      console.log(response);
    });
  }

  oathVerify() {
    let token = this.authService.getAccessToken();
    return this.http.get("https://login.eveonline.com/oauth/verify", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token.access_token
      })
    });
  }

  get(path: string) {
    debugger;
    let token = this.authService.getAccessToken();
    return this.http.get("http://localhost:4201/latest/" + path, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token.access_token
      })
    });
  }
}
