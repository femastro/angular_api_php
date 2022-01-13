import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserI, UserResponse } from './../../interface/user.interface';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private route: Router) {
    this.checkToken();
  }

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
          this.saveLocalStorage(user);
          this.user.next(user);
          return user;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.user.next(null);
    this.route.navigate(['/login']);
  }

  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')) || null;

    if (user) {
      this.user.next(user);
    } else {
      this.logout();
    }
  }

  private saveLocalStorage(user: UserResponse): void {
    const { usuario, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  private handlerError(err): Observable<never> {
    let errorMessage = ' Usuario y Password Son Incorrectos ...';
    window.alert("Atención : "+errorMessage);
    return throwError(errorMessage);
  }
}
