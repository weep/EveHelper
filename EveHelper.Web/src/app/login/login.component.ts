import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private vCode: string;
  private keyId: string;

  constructor(private authSerivce: AuthService) {
    var auth = this.authSerivce.get();
    this.vCode = auth.vCode;
    this.keyId = auth.keyId;
  }

  ngOnInit() {
  }

  saveCode() {
    this.authSerivce.save(this.keyId, this.vCode);
  }

}
