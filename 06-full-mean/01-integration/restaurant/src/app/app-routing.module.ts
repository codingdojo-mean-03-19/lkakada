import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './home/list/list.component';
import { AddComponent } from './home/add/add.component';
import { ReviewComponent } from './review/review.component';
import { AddReviewComponent } from './review/add-review/add-review.component';
import { ListReviewComponent } from './review/list-review/list-review.component';

const routes: Routes = [
  { path: '', redirectTo: '/listing', pathMatch: 'full' },
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'listing', component: ListComponent },
      { path: 'adding', component: AddComponent }
    ]
  },
  {
    path: 'review', component: ReviewComponent,
    children: [
      { path: 'list/:restaurant_id', component: ListReviewComponent },
      { path: 'adding/:restaurant_id', component: AddReviewComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
