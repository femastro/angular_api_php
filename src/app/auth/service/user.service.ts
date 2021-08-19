import { HttpClient } from '@angular/common/http';
import { UserI } from './../../interface/user.interface';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  user$ = {usuario:'', privilegios:''};
  
  constructor(
    private http: HttpClient
  ) {}
  
  login(data: UserI) {
    return this.http.post<any>(`${environment.apiUser}`, data)
    .pipe( 
      tap(res => {
        this.user$ = res
      })
    );
    
    
  }
}
