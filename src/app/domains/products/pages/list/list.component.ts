import { Component, Input, OnInit, SimpleChanges, inject, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../models/product.model';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CartService } from '../../../shared/services/cart-service/cart.service';
import { ProductService } from '../../../shared/services/product-service/product.service';
import { CategoryService } from '@shared/services/category-service/category.service';
import { Category } from '../../models/category.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id?: string;


  constructor() {

  }

  ngOnInit(): void {
    //this.getProducts();
    this.getAllCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    const category_id = changes['category_id'];
    if(category_id) {
      this.getProducts();
    }
    console.group('ngOnChanges');
    console.log('category_id', category_id);
    console.groupEnd();
  }

  getProducts(): void {
    
    this.productService.getProducts(this.category_id).subscribe({
      next: (products: Product[]) => {
        this.products.set(products);    
        console.group('getProducts');
        console.log('getProducts', this.products());
        console.groupEnd();
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

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories.set(categories);
        console.group('getAllCategories');
        console.log('getAllCategories', this.categories());
        console.groupEnd();
      },
      error: (error: Error) => {
        console.error('list.component.ts - getAllCategories - error - ', error.message);
      }
    });
  }
  
  // getProductsByCategory(categoryId: number): void {
  //   this.categoryService.getProductsByCategory(categoryId).subscribe({
  //     next: (products: Product[]) => {
  //       console.group('getProductsByCategory');
  //       this.products.set(products);
  //       console.log('this.products', this.products());
  //       console.groupEnd();
  //     },
  //     error: (error: Error) => {
  //       console.error('list.component.ts - error - ', error.message);
  //     }
  //   });
  // }
}
