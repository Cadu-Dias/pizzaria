import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { User } from '../../../models/interfaces/interfaces';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly URL = `${environment.baseUrl}/${environment.routes.users}`

  getUsers() : Observable<User[]>{
    return this.http.get<User[]>(this.URL).pipe(
      shareReplay()
    );
  }

  postUsers(user: User): Observable<User> {
    return this.http.post<User>(this.URL, user).pipe(
      shareReplay()
    )
  }

  deleteAccount(userId: string) : Observable<User> {
    return this.http.delete<User>(`${this.URL}/${userId}`).pipe(
      shareReplay()
    )
  }
}
