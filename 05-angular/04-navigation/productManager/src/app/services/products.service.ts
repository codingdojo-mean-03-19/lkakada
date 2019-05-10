import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }
  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>('/product');
  }
  createProduct(product): Observable<Product> {
    return this._http.post<Product>('/product/create', product);
  }
  removeProduct(id: string): Observable<Product> {
    return this._http.delete<Product>(`/product/${id}`);
  }
  getUpdate(product): Observable<Product> {
    return this._http.put<Product>(`/product/${product._id}`, product);
  }
  getProduct(id: string): Observable<Product> {
    return this._http.get<Product>(`/product/edit/${id}`)
  }
}
