import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UserService } from '@auth/service/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserResponse } from '@app/interface/user.interface';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean = false;

  private destroy$ = new Subject<any>();
  
  constructor(
    private route: Router,
    private userSvc: UserService,
  ) {}

  ngOnInit(): void {
    this.userSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserResponse) =>{
        let privilegios = user?.privilegios
        this.isLogged = privilegios=="3" ? true : false; 
      })
  }


  logOut(){
    this.destroy$.next({});
    this.destroy$.complete();
    this.route.navigate(['/']);
  }

}
