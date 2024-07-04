import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CartService } from '@shared/services/cart-service/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private cartService = inject(CartService);

  deleteProductFromCart(index: number): void {
    console.group('deleteProductFromCartTest');
    console.log('product', index);
    this.cartService.deleteProductFromCart(index);
    this.cartService.calculateTotal(this.cartService.cart());
    console.groupEnd();
  }
}
