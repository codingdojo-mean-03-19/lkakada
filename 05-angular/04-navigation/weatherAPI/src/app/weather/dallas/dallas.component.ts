import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-dallas',
  templateUrl: './dallas.component.html',
  styleUrls: ['./dallas.component.css']
})
export class DallasComponent implements OnInit {
  city;
  constructor(private readonly _weatherService: WeatherService) { }

  ngOnInit() {
    let observable = this._weatherService.getWeather('dallas')
    observable.subscribe(weather => {
      this.city = weather;
    })
  }
}
