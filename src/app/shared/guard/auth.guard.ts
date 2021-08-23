import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '@auth/service/user.service';
import { UserResponse } from '@app/interface/user.interface';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userSvc: UserService
  ){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.userSvc.user$.pipe(
      take(1),
      map((user: UserResponse) => (
        user ? true : false
      ))
    );


  }
  
}
