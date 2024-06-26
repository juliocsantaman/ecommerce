import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../models/product.model';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CartService } from '../../../shared/services/cart-service/cart.service';
import { ProductService } from '../../../shared/services/product-service/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  products = signal<Product[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService)


  constructor() {

  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products.set(products);    
      },
      error: (error: Error) => {
        console.error('list.component.ts - getProducts - error', error.message);
      }
    });
  }

  addToCart(product: Product): void {
    console.group('addToCart');
    console.log('product', product);
    this.cartService.addToCart(product);
    this.cartService.calculateTotal(this.cartService.cart());
    console.groupEnd();
  }


  deleteProductFromCart(index: number): void {
    console.group('deleteProductFromCartTest');
    console.log('product', index);
    this.cartService.deleteProductFromCart(index);
    this.cartService.calculateTotal(this.cartService.cart());
    console.groupEnd();
  }

}
