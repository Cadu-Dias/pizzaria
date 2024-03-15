import { Injectable } from '@angular/core';
import { Order } from '../../models/interfaces/interfaces';
import { environment } from '../../../../environments/environment.development';
import { Observable, shareReplay } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient 
  ) { }

  private readonly URL = `${environment.baseUrl}/${environment.routes.orders}`
  getOrder() : Observable<Array<Order>>{
    return this.http.get<Order[]>(this.URL).pipe(
      shareReplay()
    )
  }

  postOrder(order: Order) : Observable<Order> {
    return this.http.post<Order>(this.URL, order)
  }

  deleteOrder(orderId: string) : Observable<Order>  {
    return this.http.delete<Order>(`${this.URL}/${orderId}`)
  }

  updateOrder(orderId: string, newOrder: Order) : Observable<Order>  {
    return this.http.put<Order>(`${this.URL}/${orderId}`, newOrder)
  }

  getUserOrders(userId: string) : Observable<Order[]> {
    let params = new HttpParams().set("userId", userId);
    return this.http.get<Order[]>(`${this.URL}`, {params})
  }
}
