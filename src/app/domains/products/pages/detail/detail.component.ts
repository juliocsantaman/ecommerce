import { Component, inject, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { ProductService } from '@shared/services/product-service/product.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@shared/services/cart-service/cart.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ProductComponent, UpperCasePipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

  productId!: number;
  product!: Product;
  cover = signal('');

  private productService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        this.productId = params['id'];
        console.group('ngOnInit');
        console.log('params', params);
        console.log('this.productId', this.productId);
        console.groupEnd();
        this.getProductById(this.productId);
      },
      error: (error: Error) => {
        console.group('ngOnInit');
        console.log('ngOnInit - detail.component - error - ', error.message);
        console.groupEnd();
      }
    });
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (product: Product) => {
        this.product = product;
        if(this.product.images.length > 0) {
          this.cover.set(this.product.images[0]);
        }
      },
      error: (error: Error) => {
        console.group('getProductById');
        console.error('getProductById - detail.component.ts - error - ', error.message);
        console.groupEnd();
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

  changeCover(index: number): void {
    this.cover.set(this.product.images[index]);
  }

}
