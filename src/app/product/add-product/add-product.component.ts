import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter, first, map } from 'rxjs/operators';
import { AppDataStore } from '../../state-transitions/app-data.store';
import { AppEvent } from '../../state-transitions/app-events.enum';
import { doTransition } from '../../state-transitions/state-transitions';
import { StateTransitionData } from '../../state-transitions/state-transitions.model';
import { AppViewState } from '../../state-transitions/view-states.enum';
import { Product } from '../product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  stData: StateTransitionData = new StateTransitionData();
  statusMessage: string = "";

  constructor(
    private appDataStore: AppDataStore,
    private activatedRoute: ActivatedRoute,
    private router: Router, private location: Location) {
    this.stData.product = this.router.getCurrentNavigation().extras.state.product;
  }

  ngOnInit(): void { 
    this.stData.preEvent = AppEvent.add_product;
    this.stData = doTransition(this.appDataStore, this.stData);
    if (this.stData.finalState !== AppViewState.ADDPRODUCTSUCCESSVIEW) {
      this.router.navigate(['/**'])
    }
    this.statusMessage = "Add Product Success";
  }
}
