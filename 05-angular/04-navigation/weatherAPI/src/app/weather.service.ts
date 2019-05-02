import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Weather } from './models';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private readonly _http: HttpClient) { }

  getWeather(city: string): Observable<Weather[]> {
    return this._http.get<Weather[]>(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=44437b14b33f6e3c62e4dbc7e06b2621`);
  }
}
