import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(theCartItem: CartItem) {
    //index of the item already in the cart
    let alreadyExistsInCartIndex: number = -1;

    //find the item in the cart based on item id
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id === theCartItem.id) {
        alreadyExistsInCartIndex = i;
        break;
      }
    }

    if (alreadyExistsInCartIndex !== -1) {
      //increment the quantity
      this.cartItems[alreadyExistsInCartIndex].quantity++;
    } else {
      //just add the item to the array
      this.cartItems.push(theCartItem);
    }

    //compute cart total price and total quantity
    this.computeCartTotal();
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotal();
    }
  }

  //find the index of the item and then remove
  remove(theCartItem: CartItem) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id === theCartItem.id) {
        this.cartItems.splice(i, 1);
      }
    }
  }

  computeCartTotal() {
    let totalPrice: number = 0;
    let totalQuantity: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPrice += currentCartItem.quantity * +currentCartItem.unitPrice;
      totalQuantity += currentCartItem.quantity;
    }

    //publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    //log cart data for debugging
    this.logCartData(totalPrice, totalQuantity);
  }

  logCartData(price: number, quantity: number) {
    console.log('contents of the cart');
    for (let temp of this.cartItems) {
      const subTotalPrice: number = temp.quantity * +temp.unitPrice;
      console.log(
        `name" ${temp.name}, quantity: ${temp.quantity}, unitPrice: ${temp.unitPrice}, subTotalPrice =${subTotalPrice}`
      );
    }

    console.log(`totalPrice: ${price.toFixed(2)}, totalQuantity: ${quantity}`);
    console.log('-------');
  }
}
