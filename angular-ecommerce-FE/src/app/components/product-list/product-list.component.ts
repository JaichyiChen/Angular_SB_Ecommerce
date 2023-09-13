import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  //
  previousKeyword: string = '';

  //ActivatedRoute used for accessing current route param
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    //staying on the same component, so subscription is needed to refetch when param change
    this.route.paramMap.subscribe(() => {
      this.getProductList();
    });
  }

  getProductList() {
    //conditionally render based on if in search mode or not
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    //check if "id" param is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    // set category id based on param
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    //check if we have a different category than the previous
    //Note: Angular reuses a component if it's currently being viewed

    //if we have a different category id than previous
    //then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    //now get products based on category id
    this.productService
      .getProductListPaginate(
        this.currentCategoryId,
        this.thePageNumber - 1,
        this.thePageSize
      )
      .subscribe(this.processResult());
  }

  handleSearchProducts() {
    const keyWord: string = this.route.snapshot.paramMap.get('keyword')!;

    //if we have a different keyword than previous
    //then set the pageNumber to 1

    if (this.previousKeyword != keyWord) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = keyWord;

    this.productService
      .searchProductListPaginate(
        keyWord,
        this.thePageNumber - 1,
        this.thePageSize
      )
      .subscribe(this.processResult());
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.handleListProducts();
  }

  //resetting variables back to default
  //assigning the data retrieved from backend
  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  //handle add to cart
  addToCart(product: any) {
    //TODO ... implement functionality

    const theCartItem = new CartItem(product);
    this.cartService.addToCart(theCartItem);
  }
}
