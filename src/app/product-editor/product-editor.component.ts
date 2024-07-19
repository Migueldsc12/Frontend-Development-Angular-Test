import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit {
  product: any = {};
  customProperties = [{ key: '', value: '' }]; // Inicializa con al menos un par clave-valor

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const authKey = localStorage.getItem('authKey');
    if (id && authKey) {
      this.productService.getProducts(authKey).subscribe(data => {
        const product = data.find((p: any) => p.id === +id);
        if (product) {
          this.product = product;
          // map propierties
          if (this.product.profile) {
            this.customProperties = Object.keys(this.product.profile).map(key => ({
              key: key,
              value: this.product.profile[key]
            }));
          }
        }
      });
    }
  }

  onSubmit(form: any) {
    const profile: { [key: string]: string } = {};
    this.customProperties.forEach((prop, index) => {
      profile[form.value[`key-${index}`]] = form.value[`value-${index}`];
    });

    const product = {
      name: form.value.name,
      description: form.value.description,
      cost: form.value.cost,
      profile: profile
    };

    const authKey = localStorage.getItem('authKey');
    if (authKey) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        // Edit Product
        this.productService.updateProduct(this.product.id, product, authKey).subscribe(response => {
          console.log('Product updated:', response);
          this.router.navigate(['/products']);
        }, error => {
          console.error('Error updating product:', error);
        });
      } else {
        // Create new Product
        this.productService.createProduct(product, authKey).subscribe(response => {
          console.log('Product created:', response);
          this.router.navigate(['/products']);
        }, error => {
          console.error('Error creating product:', error);
        });
      }
    } else {
      console.error('No auth key found.');
    }
  }

  addProperty() {
    this.customProperties.push({ key: '', value: '' });
  }

  removeProperty(index: number) {
    this.customProperties.splice(index, 1);
  }
}
