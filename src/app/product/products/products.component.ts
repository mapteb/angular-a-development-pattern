import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AppDataStore } from '../../state-transitions/app-data.store';
import { AppEvent } from '../../state-transitions/app-events.enum';
import { doTransition } from '../../state-transitions/state-transitions';
import { AppData, StateTransitionData } from '../../state-transitions/state-transitions.model';
import { AppViewState } from '../../state-transitions/view-states.enum';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  appData$: Observable<AppData>;
  viewState: string = AppViewState.ONLOADSUCCESSVIEW;
  errorMessage: string;
  stData: StateTransitionData;

  constructor(private appDataStore: AppDataStore, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.stData = new StateTransitionData();
    this.stData.preEvent = AppEvent.get_products;
    this.stData = doTransition(this.appDataStore, this.stData);
    if (this.stData.finalState !== AppViewState.PRODUCTSVIEW) {
      this.router.navigate(['/**'])
    }
    this.appData$ = this.appDataStore.state$;
  }

  addProduct() {
    this.router.navigate(['/add-product-form', {fromView: AppViewState.PRODUCTSVIEW}]);
  }
}
