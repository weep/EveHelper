import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private vCode: string;
  private keyId: string;

  constructor() {
    var authString = window.localStorage.getItem("auth");
    console.log(authString);
    var auth = JSON.parse(authString) || {};
    console.log(auth);
    this.vCode = auth.vCode;
    this.keyId = auth.keyId;
  }

  ngOnInit() {
  }

  saveCode() {
    console.log(this);

    var auth = {
      "vCode": this.vCode,
      "keyId": this.keyId
    };
    var authString = JSON.stringify(auth);
    console.log(auth, authString);
    window.localStorage.setItem("auth", authString);
    console.log("saved");
  }

}
