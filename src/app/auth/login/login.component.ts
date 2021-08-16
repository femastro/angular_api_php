import { Component, OnInit } from '@angular/core';

import { UserService } from '@auth/service/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
  }

  onlogin(){
    this.userSvc.login();
  }

}
