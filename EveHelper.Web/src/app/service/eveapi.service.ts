import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable()
export class EveapiService {

  constructor(private as: AuthService, private http: HttpClient) {
  }

  characters() {
    let params: HttpParams = new HttpParams();

    this.http.get("https://api.eveonline.com/account/characters.xml.aspx", { params: params }).subscribe(
      (response) => { console.log(response) },
      () => { console.log("complete"); }
    );
  }
}
