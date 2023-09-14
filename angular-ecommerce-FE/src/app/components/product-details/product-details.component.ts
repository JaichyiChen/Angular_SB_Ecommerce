import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    //get the id param string, convert to num
    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService
      .getProduct(productId)
      .subscribe((data) => (this.product = data));
  }

  addToCart() {
    console.log(this.product);
    const theCartItem: CartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
}
