import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  // storage: Storage = sessionStorage;
  storage: Storage = localStorage;

  constructor() {
    // read data from storage
    let data = JSON.parse(this.storage.getItem('cartItems'));

    if (data != null) {
      this.cartItems = data;

      // compute totals based on the data that is read from storage
      this.computeCartTotals();
    }
   }

  // addToCart(theCartItem: CartItem) {
  //   let alreadyExistsInCart: boolean = false;
  //   let existingCartItem: CartItem = undefined!;

  //   if (this.cartItems.length > 0) {
  //     existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id);

  //     alreadyExistsInCart = (existingCartItem != undefined);
  //   }

  //   if (alreadyExistsInCart) {
  //     existingCartItem.quantity ++;
  //   }
  //   else {
  //     this.cartItems.push(theCartItem);
  //   }
  //   this.computeCartTotals();

  // }
  addToCart(newItem: CartItem) {
    let existingCartItem: CartItem | undefined = this.cartItems.find(item => item.id === newItem.id);

    if (existingCartItem !== undefined) {
      existingCartItem.quantity ++;
    }
    else {
      this.cartItems.push(newItem);
    }
    this.computeCartTotals();

  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);

    // persist cart data
    this.persistCartItems();
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
    }
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity --;
    if (theCartItem.quantity == 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id );
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}
