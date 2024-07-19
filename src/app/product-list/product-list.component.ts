import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditorComponent } from '../product-editor/product-editor.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  displayedColumns = ['index', 'sku', 'name', 'cost', 'actions'];
  dataSource = new MatTableDataSource(this.products);

  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const authKey = localStorage.getItem('authKey');
    if (authKey) {
      this.productService.getProducts(authKey).subscribe((data) => {
        this.products = data;
        this.dataSource.data = this.products;
      });
    }
  }

  /**
   * viewDetails
   * 
   * redirect to a details page for products
   */
  viewDetails(product: any) {
    this.router.navigate(['/product-details', product.id]);
  }

  /**
   * editProduct
   * 
   * redirect to a editor page for products
   */
  editProduct(product: any) {
    this.router.navigate(['/product-editor', product.id]);
  }

  /**
   * confirmDelete
   * 
   * warning before delete a product
   */
  confirmDelete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      const authKey = localStorage.getItem('authKey');
      if (authKey) {
        this.productService.deleteProduct(id, authKey).subscribe(() => {
          this.products = this.products.filter((product) => product.id !== id);
          this.dataSource.data = this.products;
        });
      }
    }
  }

  /**
   * createProduct
   * 
   * redirect to a creating page for products
   */
  createProduct() {
    this.router.navigate(['/product-editor']);
  }
}
