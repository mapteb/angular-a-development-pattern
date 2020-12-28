import { Injectable } from '@angular/core';
import { Store } from 'rxjs-observable-store';
import { AppData } from './state-transitions.model';
import { ProductsService } from '../product/products.service';
import { AppViewState } from './view-states.enum';
import { Product } from '../product/product.model';
import { UserService } from './user.service';
import { User } from './user.model';
import { first } from 'rxjs/operators';

/**
 * This class will manage all the data needed for the the SPA
 * like when to persist/refresh from backend,
 * when to persist/refresh from localStorage etc.
 */
@Injectable({
  providedIn: 'root'
})
export class AppDataStore extends Store<AppData>{

  constructor(private userService: UserService,
    private productsService: ProductsService) {
    super(new AppData());
    //initialize the user
    this.initUser();
  }

  initUser() {
    //TODO: get authenticated user from localStorage or from login
    const user: User = new User();
    user.id = "admin-user";
    this.userService.getUserRoles(user.id).pipe(first(),).subscribe(ur => {
      user.appRoles = ur;
      this.state.user = user;
    });
  }

  loadProducts(): void {
    if (this.state.products.length === 0) {
      this.productsService.getProducts().pipe(first(),).subscribe(products => this.setState({
        ...this.state,
        products: products
      }));
    }
  }

  loadProduct(productId: number) {
    //TODO: call the productService to get product details
    const _product: Product = this.state.products.find(cp => cp.id === productId);
    this.setState({
      ...this.state,
      product: _product
    });
  }

  addProduct(product: Product): Product {
    //TODO: call the productService to persit and get id
    product.id = this.state.products.length + 1;
    this.setState({
      ...this.state,
      products: [...this.state.products, product]
    });
    return product;
  }

  addToCart(productId: number) {
    //add only if not already in the cart
    if (!this.state.cartProducts.find(cp => cp.id === productId)) {
      const product: Product = this.state.products.find(cp => cp.id === productId);
      if (product) {
        this.setState({
          ...this.state,
          cartProducts: [...this.state.cartProducts, product]
        });
      }
    }
  }
}
