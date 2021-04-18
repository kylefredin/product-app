import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
import { Product } from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'actions',
  ];

  dataSource = new MatTableDataSource<Product>();

  product = new Product();

  errors: string[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.readProducts().subscribe(({ products }) => {
      this.dataSource.data = products;
    });
  }

  selectProduct(product: Product) {
    this.product = product;
  }

  newProduct() {
    this.product = new Product();
  }

  createProduct(f: any) {
    this.apiService.createProduct(f.value).subscribe(
      (result) => {
        console.log('result', result);

        this.dataSource.data = [...this.dataSource.data, result.product];

        this.newProduct();
      },
      (error) => {
        this.errors.concat(error);
      }
    );
  }

  deleteProduct(id: number) {
    this.apiService.deleteProduct(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (product) => id !== product.id
      );
    });
  }

  updateProduct(f: any) {
    f.value.id = this.product['id'];

    this.apiService.updateProduct(f.value).subscribe((result) => {
      this.dataSource.data.forEach((product) => {
        if (product.id === result.product.id) {
          product = result.product;
        }
      });

      this.newProduct();
    });
  }
}
