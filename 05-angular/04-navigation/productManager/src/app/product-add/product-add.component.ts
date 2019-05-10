import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  product = new Product();
  errors: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
  }
  onSubmit(event: Event) {
    event.preventDefault();
    this.productsService.createProduct(this.product)
      .subscribe(
        product => {
          console.log(product);
          this.router.navigateByUrl('/products');
        },
        error => {
          this.handleErrors(error.error);
        })
  }
  cancelCreate() {
    this.router.navigateByUrl('/products');
  }
  private handleErrors(errors: string[] | string) {
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
}
