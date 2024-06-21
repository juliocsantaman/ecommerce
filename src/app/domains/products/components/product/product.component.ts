import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Input({required: true}) product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  add(product: Product): void {
    this.addToCart.emit(product);
  }

}
