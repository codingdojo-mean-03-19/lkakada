import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskHttpService } from './task-http.service';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TaskHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
