import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const authKey = localStorage.getItem('authKey');
    if (authKey && id !== null) {
      this.productService.getProducts(authKey).subscribe(data => {
        this.product = data.find((prod: any) => prod.id === +id);
      });
    }
  }
}
