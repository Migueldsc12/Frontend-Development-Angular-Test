import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';

const routes: Routes = [
  { path: '', component: ProductListComponent }
];

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatIcon,
    RouterModule.forChild(routes)
  ]
})
export class ProductListModule { }
