import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../../../products/models/category.model';
import { Observable } from 'rxjs';
import { Product } from '../../../products/models/product.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);
  private apiBase: string = 'https://api.escuelajs.co/api/v1/categories';
  private filterProductsByCategoryApi = 'https://api.escuelajs.co/api/v1/products/?categoryId=';

  constructor() { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiBase);
  }

  // getProductsByCategory(categoryId: number): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.apiBase + '/' + categoryId + '/products');
  // }

  // getProductsByCategory(categoryId: number): Observable<Product[]> {
  //   if(categoryId === -1) {
  //     return this.http.get<Product[]>(this.filterProductsByCategoryApi);
  //   }
  //   return this.http.get<Product[]>(this.filterProductsByCategoryApi + categoryId);
  // }
}
