import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '@auth/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userSvc: UserService 
  ){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("Guard => ",this.userSvc.user$);
    const { privilegios } = this.userSvc.user$;
    if ( privilegios == '3' ){
      return true;
    }
    return false;
  }
  
}
