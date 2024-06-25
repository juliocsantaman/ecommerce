import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Product } from '../../../products/models/product.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  hideSideMenu = signal(true);
  @Input({ required: true }) cart!: Product[];
  @Input({ required: true }) cartTotal!: number;
  @Output() eventDeleteProductFromCart = new EventEmitter<number>();

  toggleSideMenu(): void {
    this.hideSideMenu.update((previousState) => !previousState);
  }

  deleteProductFromCart(index: number): void {
    console.group('deleteProductFromCart');
    console.log('product', index);
    this.eventDeleteProductFromCart.emit(index);
    //this.cart.update((previuosState) => previuosState.filter((product, position) => position != index));
    console.groupEnd();
  }

}
