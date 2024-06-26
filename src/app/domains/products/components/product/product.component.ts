import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { UpperCasePipe, CurrencyPipe, DatePipe } from '@angular/common';
import { ReversePipe } from '@shared/pipes/reverse-pipe/reverse.pipe';
import { TimeAgoPipe } from '@shared/pipes/time-ago-pipe/time-ago.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReversePipe, TimeAgoPipe],
  //imports: [UpperCasePipe, CurrencyPipe, DatePipe],
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
