import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as fromAuthors from './authors';
import { QuoteListComponent } from './quotes/quote-list/quote-list.component';
import { QuoteNewComponent } from './quotes/quote-new/quote-new.component'

@NgModule({
  declarations: [
    AppComponent,
    fromAuthors.components,
    QuoteListComponent,
    QuoteNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
