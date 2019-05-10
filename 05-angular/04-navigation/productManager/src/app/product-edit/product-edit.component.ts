import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../services/products.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../models';



@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],

})
export class ProductEditComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.product = { _id: '', title: '', price: 0, imageUrl: '' }

    this.route.paramMap
      .pipe(
        map(params => params.get('product_id')),
        switchMap(id => this.productsService.getProduct(id))
      )
      .subscribe(product => (this.product = product))
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Updating author', this.product);
    this.productsService.getUpdate(this.product)
      .subscribe(
        product => {
          console.log('updated product', product);
          this.router.navigateByUrl('/products')
        },
        error => {
          console.log(error.error);
        })
  }
}
