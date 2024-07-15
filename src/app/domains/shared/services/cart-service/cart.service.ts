import { Injectable, signal } from '@angular/core';
import { Product } from '../../../products/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Product[]>([]);
  cartTotal = signal<number>(0);

  constructor() { }

  addToCart(product: Product) {
    this.cart.update((previousState) => [...previousState, product]);
  }

  deleteProductFromCart(index: number): void {
    this.cart.update((previuosState) => previuosState.filter((product, position) => position != index));
  }

  calculateTotal(products: Product[]): void {
    let add = 0;
    products.forEach((product) => {
      add += product.price;
    });

    this.cartTotal.update((previousState) => add);
  }

  initialCart() {
    this.cart.set([]);
    this.cartTotal.set(0);
  }
}
