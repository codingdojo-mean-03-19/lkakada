import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-seattle',
  templateUrl: './seattle.component.html',
  styleUrls: ['./seattle.component.css']
})
export class SeattleComponent implements OnInit {
  city;
  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    let observable = this._weatherService.getWeather('seattle')
    observable.subscribe(weather => {
      this.city = weather;
      console.log(this.city);
    })
  }
}
