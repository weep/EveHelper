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
      console.log(params);
      let code = params.code;
      let state = params.state;
      if (code === undefined) {
        return;
        //this.router.navigate(["/"]);
      }

      let expectedState = window.localStorage.getItem("login_state");
      if (expectedState != state) {
        this.status = "WRONG STATE";
        return;
      }
      else{
        window.localStorage.removeItem("login_state");
      }

      this.as.token(code).subscribe(() => {
        this.as.loadCharacter().subscribe(char => {
          this.router.navigate(["/"]);
        });
      });
    });
  }
}
