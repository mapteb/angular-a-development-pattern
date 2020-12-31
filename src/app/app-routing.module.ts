import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './product/products/products.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { AddToCartComponent } from './product/add-to-cart/add-to-cart.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { AddProductFormComponent } from './product/add-product-form/add-product-form.component';
import { CartButtonComponent } from './cart/cart-button/cart-button.component';

const appRoutes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'add-product-form',
    component: AddProductFormComponent
  },
  {
    path: 'add-to-cart',
    component: AddToCartComponent
  },
  {
    path: 'cart-button',
    component: CartButtonComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
