import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable()
export class InternalapiService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>("http://localhost:4201/" + path, {
      //headers: new HttpHeaders({ "Authorization": "Bearer " + this.authService.accessToken.access_token })
    });
  }

  post<T>(path: string, object: any): Observable<T> {
    return this.http.post<T>("http://localhost:4201/" + path, object, {
      //headers: new HttpHeaders({ "Authorization": "Bearer " + this.authService.accessToken.access_token })
    });
  }

}
