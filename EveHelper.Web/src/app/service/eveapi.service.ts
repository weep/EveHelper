import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AccessToken } from '../models/access-token';

import 'rxjs/Rx';
import { Character } from '../models/character';

@Injectable()
export class EveapiService {

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  test() {
    this.http.get("https://login.eveonline.com/oauth/verify").subscribe((response) => {
      console.log(response);
    });
  }

  get character() {
    return this.authService.character;
  }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>("http://localhost:4201/latest/" + path, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.authService.accessToken.access_token,
        "Cache-Control": "max-age=300"
      })
    });
  }

  post<T>(path: string, object: any): Observable<T> {
    return this.http.post<T>("http://localhost:4201/latest/" + path, object, {
      headers: new HttpHeaders({ "Authorization": "Bearer " + this.authService.accessToken.access_token })
    });
  }
}
