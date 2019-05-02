import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-sanjose',
  templateUrl: './sanjose.component.html',
  styleUrls: ['./sanjose.component.css']
})
export class SanjoseComponent implements OnInit {
  city;
  constructor(private readonly _weatherService: WeatherService) { }

  ngOnInit() {
    let observable = this._weatherService.getWeather('san+jose')
    observable.subscribe(weather => {
      this.city = weather;
      console.log(this.city);
    })
  }

}
