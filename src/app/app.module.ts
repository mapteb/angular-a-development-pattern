import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductsComponent } from './product/products/products.component';
import { AddToCartComponent } from './product/add-to-cart/add-to-cart.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { AddProductFormComponent } from './product/add-product-form/add-product-form.component';

/**
 *   DEFAULT -> onload -> processOnload() -> onload_succcess -> ONLOASUCCESSDVIEW
 *   ONLOADSUCCESSVIEW -> get_products -> processGetProducts() -> get_products_succcess -> PRODUCTSVIEW
 *   PRODUCTSVIEW -> get_product_details -> processGetProductDetails() -> get_product_details_success -> PRODUCTDETAILSVIEW
 *   PRODUCTDETAILSVIEW -> add_to_cart -> processAddToCart() -> add_to_cart_success -> ADDTOCARTSUCCESSVIEW
 *   ADDTOCARTSUCCESSVIEW -> get_cart -> processGetCart() -> get_cart_success -> CARTVIEW
 *   CARTVIEW -> get_products -> processGetProducts() -> get_products_succcess -> PRODUCTSVIEW
 */


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CartComponent,
    AddToCartComponent,
    AddProductComponent,
    AddProductFormComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor() {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
