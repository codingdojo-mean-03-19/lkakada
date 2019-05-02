import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private _httpService: WeatherService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }
  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => console.log(params['id']));
  }
  title = 'Dojo Weather Forcast';
  goHome() {
    this._router.navigate(['/home']);
  }
}
