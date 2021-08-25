import { HttpClient } from '@angular/common/http';
import { UserI, UserResponse } from './../../interface/user.interface';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

  private user = new BehaviorSubject<UserResponse>(null);

  get user$(): Observable<UserResponse> {
    return this.user.asObservable();
  }

  get userValue(): UserResponse {
    return this.user.getValue();
  }

  login(data: UserI): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.apiUser}`, data)
    .pipe(
        map((user: UserResponse) => {
          this.user.next(user);
          return user;
        }),
        catchError((err) => this.handlerError(err))
      );    
  }

  private handlerError(err): Observable<never> {
    let errorMessage = 'An errror occured retrienving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
