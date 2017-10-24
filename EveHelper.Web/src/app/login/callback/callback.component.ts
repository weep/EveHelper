import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { URLSearchParams } from "@angular/http";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  private status = "loading";

  constructor(private activatedRoute: ActivatedRoute, private as: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      debugger;
      let code = params.code;
      if(code === undefined){
        this.router.navigate(["/"]);
      }
      this.as.setCode(code)
      this.status = "done!";
      this.router.navigate(["/login"]);
    });
  }
}
