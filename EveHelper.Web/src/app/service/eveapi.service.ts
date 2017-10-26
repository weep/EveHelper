import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AccessToken } from '../models/access-token';

import 'rxjs/Rx';

@Injectable()
export class EveapiService {

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  test() {
    this.http.get("https://login.eveonline.com/oauth/verify").subscribe((response) => {
      console.log(response);
    });
  }

  get(path: string) {
    let token = this.authService.getAccessToken();
    return this.http.get("http://localhost:4201/latest/" + path, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token.access_token
      })
    });
  }

  character() {
    return this.authService.character();
  }
}
