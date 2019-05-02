import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';
@Component({
  selector: 'app-washington',
  templateUrl: './washington.component.html',
  styleUrls: ['./washington.component.css']
})
export class WashingtonComponent implements OnInit {

  constructor(private readonly _weatherService: WeatherService) { }
  city;
  ngOnInit() {
    let observable = this._weatherService.getWeather('washington')
    observable.subscribe(weather => {
      this.city = weather;
      console.log(this.city);
    })
  }

}
