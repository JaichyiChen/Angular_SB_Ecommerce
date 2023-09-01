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

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient
      .get<productResponse>(searchUrl)
      .pipe(map((data) => data._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<productResponseCategory>(this.categoryUrl)
      .pipe(map((data) => data._embedded.productCategory));
  }
}

interface productResponse {
  _embedded: {
    products: Product[];
  };
}
interface productResponseCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
