import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { BrandComponent } from './products/brand/brand.component';
import { CategoryComponent } from './products/category/category.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { DetailsComponent } from './reviews/details/details.component';
import { AuthorComponent } from './reviews/author/author.component';
import { AllComponent } from './reviews/all/all.component';

const routes: Routes = [
  {
    path: 'products', component: ProductsComponent, children: [
      { path: 'details/:id', component: ProductDetailComponent },
      { path: 'brand/:brand', component: BrandComponent },
      { path: 'category/:cat', component: CategoryComponent }]
  },
  {
    path: 'reviews', component: ReviewsComponent, children: [
      { path: 'details/:id', component: DetailsComponent },
      { path: 'author/:id', component: AuthorComponent },
      { path: 'all/:id', component: AllComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
