import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromAuthor from './authors';

const routes: Routes = [
  {
    path: '',
    component: fromAuthor.AuthorListComponent,
  },
  {
    path: 'author/new',
    component: fromAuthor.AuthorNewComponent,
  },
  {
    path: 'author/:author_id',
    component: fromAuthor.AuthorShowComponent
  },
  {
    path: 'author/edit/:author_id',
    component: fromAuthor.AuthorEditComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
