import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  save(keyId: string, vCode: string) {
    var auth = {
      "keyId": keyId,
      "vCode": vCode
    };
    var authString = JSON.stringify(auth);
    console.log(auth, authString);
    window.localStorage.setItem("auth", authString);
  }

  get() {
    var authString = window.localStorage.getItem("auth");
    return JSON.parse(authString) || {};
  }
}
