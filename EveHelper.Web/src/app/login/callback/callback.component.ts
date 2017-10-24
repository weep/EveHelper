import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { URLSearchParams } from "@angular/http";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  private status = "loading";

  constructor(private activatedRoute: ActivatedRoute, private as: AuthService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      let code = params.code;
      if(code === undefined){
        window.location.href = "/";
      }
      this.as.setCode(code)
      this.status = "done!";
      window.location.href = "/login";
    });
  }
}
