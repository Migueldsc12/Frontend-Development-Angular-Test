import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent {
  customProperties = [{ key: '', value: '' }];

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit(form: any) {
    const profile: { [key: string]: string } = {};
    this.customProperties.forEach((prop, index) => {
      profile[form.value[`key-${index}`]] = form.value[`value-${index}`];
    });

    const product = {
      name: form.value.name,
      description: form.value.description,
      sku: form.value.sku,
      cost: form.value.cost,
      profile: profile
    };

    const authKey = localStorage.getItem('authKey');
    if (authKey) {
      this.productService.createProduct(product, authKey).subscribe(response => {
        console.log('Product saved:', response);
        this.router.navigate(['/products']);
      }, error => {
        console.error('Error saving product:', error);
      });
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
