import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { UserService } from '@auth/service/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription = new Subscription();

  constructor(
    private userSvc: UserService,
    private route: Router,
  ) { }
  
  formLogin = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })
  
  ngOnInit(): void {
  }
  
  onlogin(){
    const form = this.formLogin.value;
    this.subscription.add(
      this.userSvc.login(form)
        .subscribe((res) =>
          {
            if(res){
              this.route.navigate(['/productos'])
            }
          }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
