import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN'
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private http = inject(HttpClient);
  private sessionStorageObject = inject(DOCUMENT).defaultView?.sessionStorage; 

  constructor() { }

  get Token() {
    return this.sessionStorageObject?.getItem(this.JWT_TOKEN)
  }

  login(user: {
    username: string, 
    password: string,
  }) : Observable<any> {
    return this.http.post('/api/login', user).pipe(
      tap(tokens => this.doLoginUser(user.username, tokens))
    )
  }

  private doLoginUser(username: string, tokens: any) {
    this.loggedUser = username;
    this.storeJwtToken(tokens.jwt);
    this.isAuthenticatedSubject.next(true)
  }

  private storeJwtToken(jwt: string) {
    this.sessionStorageObject?.setItem(this.JWT_TOKEN, jwt)
  }

  logout() {
    this.sessionStorageObject?.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false)
  }
}
