import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { URLSearchParams } from "@angular/http";
import { EveapiService } from '../../service/eveapi.service';
import { InternalapiService } from '../../service/internal/internalapi.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  private status = "loading";
  private hasCode = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private as: AuthService,
    private router: Router,
    private eapi: EveapiService,
    private ias: InternalapiService
  ) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      let code = params.code;
      let state = params.state;
      if (code === undefined) {
        return;
        //this.router.navigate(["/"]);
      }
      this.hasCode = true;
      console.log("Code", code);

      //let expectedState = window.localStorage.getItem("login_state");
      //if (expectedState != state) {
      //  this.status = "WRONG STATE";
      //  return;
      //}
      //else {
      //  window.localStorage.removeItem("login_state");
      //}

      this.as.token(code).subscribe(token => {
        console.log("Auth token", token);
        this.as.loadCharacter(token).subscribe(char => {
          console.log("Character", char);
          this.router.navigate(["/"]);
        });
      });
    });
  }
}
