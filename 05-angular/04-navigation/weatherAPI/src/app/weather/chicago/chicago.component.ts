import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-chicago',
  templateUrl: './chicago.component.html',
  styleUrls: ['./chicago.component.css']
})
export class ChicagoComponent implements OnInit {
  city;
  constructor(private readonly _weatherService: WeatherService) { }

  ngOnInit() {
    let observable = this._weatherService.getWeather('chicago')
    observable.subscribe(weather => {
      this.city = weather;
      console.log(this.city);
    })
  }

}
