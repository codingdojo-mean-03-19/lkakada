import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as fromAuthors from './authors';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorNewComponent } from './authors/author-new/author-new.component';
import { AuthorShowComponent } from './authors/author-show/author-show.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorListComponent,
    // ...fromAuthors.components,
    AuthorNewComponent,
    AuthorShowComponent,
    AuthorEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
