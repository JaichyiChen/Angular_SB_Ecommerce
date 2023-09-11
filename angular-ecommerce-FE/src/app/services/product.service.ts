import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Product } from '../models/product';
import { ProductCategory } from '../models/productCategories';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8081/api/products';

  private categoryUrl = 'http://localhost:8081/api/product-category';

  constructor(private httpClient: HttpClient) {}

  //get list of products with category id
  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient
      .get<productResponse>(searchUrl)
      .pipe(map((data) => data._embedded.products));
  }

  //get list of products with category id, page and size
  getProductListPaginate(
    categoryId: number,
    thePage: number,
    thePageSize: number
  ): Observable<productResponse> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<productResponse>(searchUrl);
  }

  //get all product categories
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<productResponseCategory>(this.categoryUrl)
      .pipe(map((data) => data._embedded.productCategory));
  }
  //get single product
  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  //search product
  searchProducts(keyWord: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyWord}`;

    return this.httpClient
      .get<productResponse>(searchUrl)
      .pipe(map((data) => data._embedded.products));
  }

  //search product with pagination
  searchProductListPaginate(
    keyWord: string,
    thePage: number,
    thePageSize: number
  ): Observable<productResponse> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyWord}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<productResponse>(searchUrl);
  }
}

interface productResponse {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPagees: number;
    number: number;
  };
}
interface productResponseCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
