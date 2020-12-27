import { Component, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { AppDataStore } from 'src/app/state-transitions/app-data.store';
import { AppEvent } from 'src/app/state-transitions/app-events.enum';
import { doTransition } from 'src/app/state-transitions/state-transitions';
import { StateTransitionData } from 'src/app/state-transitions/state-transitions.model';
import { AppViewState } from 'src/app/state-transitions/view-states.enum';
import { Product } from '../product.model';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {

  @Output() productOutput: Product;

  stData: StateTransitionData;
  isSaved: boolean;
  product: Product = new Product();

  constructor(
    private appDataStore: AppDataStore,
    private router: Router) { 
    }

  ngOnInit(): void {
    this.stData = new StateTransitionData();
    this.stData.preEvent = AppEvent.add_product_form;
    this.stData = doTransition(this.appDataStore, this.stData);
    if (this.stData.finalState !== AppViewState.ADDPRODUCTFORMSUCCESSVIEW) {
      this.router.navigate(['/**'])
    }
    this.isSaved = false;
  }

  addProduct(product: Product) {
    const navigationExtras: NavigationExtras = {state: {product: product}};
    this.router.navigate(['/add-product'], navigationExtras);
  }
}