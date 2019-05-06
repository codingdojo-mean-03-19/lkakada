import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }
  getProducts() {
    return this._http.get('/product');
  }
  createProduct(product) {
    return this._http.post('/product/create', product);
  }
  removeProduct(id: string) {
    return this._http.delete(`/product/${id}`);
  }
  getUpdate(product) {
    return this._http.put(`/product/${product._id}`, product);
  }
  getProduct(id: string) {
    return this._http.get(`/product/edit/${id}`)
  }
}
