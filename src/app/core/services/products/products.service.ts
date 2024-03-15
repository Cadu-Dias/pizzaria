import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Product } from '../../models/interfaces/interfaces';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http : HttpClient
  ) { }

  private readonly URL = `${environment.baseUrl}/${environment.routes.products}`

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.URL).pipe(
      shareReplay()
    )
  }

  getSpecificProduct(productId: string) : Observable<Product[]> {
    const params = new HttpParams().append('id', productId) 
    return this.http.get<Product[]>(this.URL, {params})
  }

  postProduct(product: Product) {
    return this.http.post<Product>(this.URL, product);
  }

  updateProduct(newProduct: Product, oldProductId: string) {
    return this.http.put(`${this.URL}/${oldProductId}`, newProduct )
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${this.URL}/${productId}`)
  }
}