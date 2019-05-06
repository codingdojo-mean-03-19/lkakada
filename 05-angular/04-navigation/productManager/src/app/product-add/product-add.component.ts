import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  product: any;
  errors: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.product = { title: '', price: 0, image: '' };
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
    this.product = { title: '', price: 0, image: '' };
    this.router.navigateByUrl('/products');

  }
  private handleErrors(errors: string[] | string) {
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
}
