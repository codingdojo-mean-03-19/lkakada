import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models';
import { Review } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private readonly base = '/api/restaurants';
  constructor(private readonly http: HttpClient) { }

  getRestarants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.base);
  }
  postRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.base}`, restaurant);
  }
  deleteRestaurant(id: string): Observable<Restaurant> {
    return this.http.delete<Restaurant>(`${this.base}/${id}`);
  }
  getRestaurant(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.base}/${id}`)
  }
  getReviews(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.base}/review/${id}`)
  }
  addReview(id: string, review: Review) {
    return this.http.post(`${this.base}/review/${id}`, review);
  }
  deleteReview(id: string) {
    return this.http.delete(`${this.base}/review/${id}`)
  }
}
