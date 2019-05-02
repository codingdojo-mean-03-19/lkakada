import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WeatherService } from './weather.service';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeattleComponent } from './weather/seattle/seattle.component';
import { SanjoseComponent } from './weather/sanjose/sanjose.component';
import { BurbankComponent } from './weather/burbank/burbank.component';
import { DallasComponent } from './weather/dallas/dallas.component';
import { WashingtonComponent } from './weather/washington/washington.component';
import { ChicagoComponent } from './weather/chicago/chicago.component';
import { PagenotfoundComponent } from './weather/pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    SeattleComponent,
    SanjoseComponent,
    BurbankComponent,
    DallasComponent,
    WashingtonComponent,
    ChicagoComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
