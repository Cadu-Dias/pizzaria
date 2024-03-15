import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Admin } from '../../../models/interfaces/interfaces';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly URL = `${environment.baseUrl}/${environment.routes.admins}`

  postAdmin(admin: Admin):Observable<Admin> {
    return this.http.post<Admin>(this.URL, admin).pipe(
      shareReplay()
    )
  }

  getAdminAccounts() : Observable<Admin[]>{
    return this.http.get<Admin[]>(this.URL).pipe(
      shareReplay()
    )
  }

  getEspecificAdmin(admin: Admin) : Observable<Admin[]> {
    let params = new HttpParams().set("username", admin.username).set("password", admin.password)
    return this.http.get<Admin[]>(this.URL, {params}).pipe(
      shareReplay()
    )
  }

  updateAdmin(adminId: string, newAdmin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.URL}/${adminId}`, newAdmin).pipe(
      shareReplay()
    )
  }

  deleteAdmin(adminId: string) : Observable<Admin> {
    return this.http.delete<Admin>(`${this.URL}/${adminId}`).pipe(
      shareReplay()
    )
  }


}