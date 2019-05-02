import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-burbank',
  templateUrl: './burbank.component.html',
  styleUrls: ['./burbank.component.css']
})
export class BurbankComponent implements OnInit {

  constructor(private readonly _weatherService: WeatherService) { }
  city;
  ngOnInit() {
    let observable = this._weatherService.getWeather('burbank')
    observable.subscribe(weather => {
      this.city = weather;
      console.log(this.city);
    })
  }

}
