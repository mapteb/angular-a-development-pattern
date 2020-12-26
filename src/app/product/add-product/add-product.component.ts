import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataStore } from 'src/app/state-transitions/app-data.store';
import { AppEvent } from 'src/app/state-transitions/app-events.enum';
import { doTransition } from 'src/app/state-transitions/state-transitions';
import { StateTransitionData } from 'src/app/state-transitions/state-transitions.model';
import { AppViewState } from 'src/app/state-transitions/view-states.enum';
import { Product } from '../product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  stData: StateTransitionData;
  statusMessage: string = "";

  constructor(
    private appDataStore: AppDataStore, 
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.stData = new StateTransitionData();
    const product: Product = new Product();
    product.name = this.activatedRoute.snapshot.params.productName;
    product.price = this.activatedRoute.snapshot.params.productPrice;
    console.log(">> p: ", product.name, product.price);
    this.stData.product = product;
    this.stData.preEvent = AppEvent.add_product;
    this.stData = doTransition(this.appDataStore, this.stData);
    if (this.stData.finalState !== AppViewState.ADDPRODUCTSUCCESSVIEW) {
      this.router.navigate(['/**'])
    }
    this.statusMessage = "Add Product Success";
  }
}
