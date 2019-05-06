import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getProducts()
      .subscribe(products => {
        console.log("Got all product", products);
        this.products = products;
      })
  }
  onDelete(productID: string) {
    this.productsService.removeProduct(productID)
      .subscribe(removedproduct => console.log(removedproduct))
    this.getAllProducts();
  }
}
