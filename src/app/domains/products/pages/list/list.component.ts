import { Component, OnInit } from '@angular/core';
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

  products: Product[] = [];

  constructor() {

  }

  ngOnInit(): void {
      this.getProducts();
  }

  getProducts(): void {
    this.products = 
    [
      {
        img: 'https://picsum.photos/640/640',
        title: 'Product 1',
        price: 3000
      },
      {
        img: 'https://picsum.photos/640/640',
        title: 'Product 2',
        price: 4000
      },
      {
        img: 'https://picsum.photos/640/640',
        title: 'Product 3',
        price: 5000
      },
      {
        img: 'https://picsum.photos/640/640',
        title: 'Product 4',
        price: 6000
      },
    ];
  }

  addToCart(product: Product): void {
    console.group('addToCart');
    console.log('product', product);
    console.groupEnd();
  }

}
