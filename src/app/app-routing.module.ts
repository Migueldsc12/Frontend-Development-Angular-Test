import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./product-list/product-list.module').then((m) => m.ProductListModule),
  },
  {
    path: 'product-editor',
    loadChildren: () =>
      import('./product-editor/product-editor.module').then((m) => m.ProductEditorModule),
  },
  {
    path: 'product-editor/:id',
    loadChildren: () =>
      import('./product-editor/product-editor.module').then((m) => m.ProductEditorModule),
  },
  {
    path: 'product-details/:id',
    loadChildren: () =>
      import('./product-details/product-details.module').then((m) => m.ProductDetailsModule),
  },

  //Otherwise redirect to login
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
