import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../../../products/models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  constructor() { }

  getProducts(category_id?: string): Observable<Product[]> {
    const url = new URL('https://api.escuelajs.co/api/v1/products/');
    if(category_id) {
      url.searchParams.set('categoryId', category_id);
    }
    return this.http.get<Product[]>(url.toString());
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>('https://api.escuelajs.co/api/v1/products/' + id);
  }
}
