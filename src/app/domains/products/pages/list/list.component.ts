import { Component, OnInit, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  products = signal<Product[]>([]);
  cart = signal<Product[]>([]);


  constructor() {

  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.products.set(
      [
        {
          id: Date.now(),
          img: 'https://picsum.photos/640/640',
          title: 'Product 1',
          price: 3000,
          createdAt: new Date().toISOString()
        },
        {
          id: Date.now(),
          img: 'https://picsum.photos/640/640',
          title: 'Product 2',
          price: 4000,
          createdAt: new Date().toISOString()
        },
        {
          id: Date.now(),
          img: 'https://picsum.photos/640/640',
          title: 'Product 3',
          price: 5000,
          createdAt: new Date().toISOString()
        },
        {
          id: Date.now(),
          img: 'https://picsum.photos/640/640',
          title: 'Product 4',
          price: 6000,
          createdAt: new Date().toISOString()
        },
      ]
    );
  }

  addToCart(product: Product): void {
    console.group('addToCart');
    console.log('product', product);
    this.cart.update((previuosState) => [...previuosState, product]);
    console.log(' this.cart()',  this.cart());
    console.groupEnd();
  }

  deleteProductFromCartTest(index: number): void {
    console.group('deleteProductFromCartTest');
    console.log('product', index);
    this.cart.update((previuosState) => previuosState.filter((product, position) => position != index));
    console.groupEnd();
  }

}
