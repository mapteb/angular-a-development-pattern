import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataStore } from 'src/app/state-transitions/app-data.store';
import { AppEvent } from 'src/app/state-transitions/app-events.enum';
import { doTransition } from 'src/app/state-transitions/state-transitions';
import { StateTransitionData } from 'src/app/state-transitions/state-transitions.model';
import { AppViewState } from 'src/app/state-transitions/view-states.enum';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {

  stData: StateTransitionData;
  isSaved: boolean;

  constructor(
    private appDataStore: AppDataStore,
    private router: Router) { }

  ngOnInit(): void {
    this.stData = new StateTransitionData();
    this.stData.preEvent = AppEvent.add_product_form;
    this.stData = doTransition(this.appDataStore, this.stData);
    if (this.stData.finalState !== AppViewState.ADDPRODUCTFORMSUCCESSVIEW) {
      this.router.navigate(['/**'])
    }
    this.isSaved = false;
  }

  addProduct(name: string, price: number) {
    this.isSaved = true;
    console.log(">> name: ", name);
    this.router.navigate(['/add-product', {
      fromView: AppViewState.PRODUCTSVIEW,
      productName: name,
      productPrice: price
    }]);
  }
}