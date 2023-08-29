import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  //ActivatedRoute used for accessing current route param
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProductList();
    });
  }

  getProductList() {
    //check if "id" param is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    // set category id based on param
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    //now get products based on category id
    this.productService
      .getProductList(this.currentCategoryId)
      .subscribe((data) => (this.products = data));
  }
}
