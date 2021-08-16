import { UserResponse } from './../../interface/user.interface';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  public user$: UserResponse = {username: '', role:''};
  
  constructor(private route: Router) { }
  
  login(){
    this.user$ = {username: 'fernando', role:'admin'};
    this.route.navigate(['home']);
  }
}
