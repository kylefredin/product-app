import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { ProductDto } from './product/product.dto';
import { ProductsDto } from './product/products.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  public readProducts(): Observable<ProductsDto> {
    return this.httpClient.get<ProductsDto>(`${this.API_SERVER}/products`);
  }

  public createProduct(product: Product): Observable<ProductDto> {
    return this.httpClient.post<ProductDto>(
      `${this.API_SERVER}/products`,
      product
    );
  }

  public updateProduct(product: Product): Observable<ProductDto> {
    return this.httpClient.put<ProductDto>(
      `${this.API_SERVER}/products/${product.id}`,
      product
    );
  }

  public deleteProduct(id: number) {
    return this.httpClient.delete(`${this.API_SERVER}/products/${id}`);
  }
}
