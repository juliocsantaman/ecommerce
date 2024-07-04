import { Component, EventEmitter, Input, Output, inject, signal, OnInit } from '@angular/core';
import { Product } from '../../../products/models/product.model';
import { CartService } from '../../services/cart-service/cart.service';
import { HighlightDirective } from '@shared/directives/highlight.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HighlightDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  hideSideMenu = signal(true);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  cartTotal = this.cartService.cartTotal;
  @Output() eventDeleteProductFromCart = new EventEmitter<number>();

  constructor() {

  }

  ngOnInit(): void {
      
  }

  toggleSideMenu(): void {
    this.hideSideMenu.update((previousState) => !previousState);
  }

  deleteProductFromCart(index: number): void {
    console.group('deleteProductFromCart');
    console.log('product', index);
    this.eventDeleteProductFromCart.emit(index);
    console.groupEnd();
  }

}
