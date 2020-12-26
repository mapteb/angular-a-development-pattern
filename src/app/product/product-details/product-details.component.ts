import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, last } from 'rxjs/operators';
import { AppDataStore } from '../../state-transitions/app-data.store';
import { AppEvent } from '../../state-transitions/app-events.enum';
import { doTransition } from '../../state-transitions/state-transitions';
import { AppData, StateTransitionData } from '../../state-transitions/state-transitions.model';
import { AppViewState } from '../../state-transitions/view-states.enum';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'en-us' // 'de' for Germany, 'fr' for France ...
   }]
})
export class ProductDetailsComponent implements OnInit {
  @Input() productIdInput: number;
  @Input() fromViewInput: string;
  
  appData$: Observable<AppData>;
  errorMessage: string;
  stData: StateTransitionData = new StateTransitionData();
  fromView: string;

  constructor(
    private appDataStore: AppDataStore,
    private activatedRoute: ActivatedRoute, 
    private router: Router) { this.appData$ = this.appDataStore.state$;}

  ngOnInit(): void {   
    if (this.productIdInput) {
      this.stData.productId = this.productIdInput;
      this.fromView = this.fromViewInput;
    }
    else {
      this.stData.productId = Number(this.activatedRoute.snapshot.params.id);
      this.fromView = this.activatedRoute.snapshot.params.fromView;
    }
    
    this.stData.preEvent = AppEvent.get_product_details;
    this.stData = doTransition(this.appDataStore, this.stData);
    if (this.stData.finalState !== AppViewState.PRODUCTDETAILSVIEW) {
      this.router.navigate(['/**'])
    }
  }

  addToCart(productId: number) {
    this.router.navigate(['/add-to-cart', {id: productId, fromView: AppViewState.PRODUCTSVIEW}]);
  }

  backTo() {
    if (this.fromView === AppViewState.PRODUCTSVIEW) {
      this.router.navigate(['/products', {fromView: AppViewState.PRODUCTDETAILSVIEW}]);
    }
    else if (this.fromView === AppViewState.CARTVIEW) {
      this.router.navigate(['/cart', {fromView: AppViewState.PRODUCTDETAILSVIEW}]);
    }
    else {
      this.router.navigate(['/**']);
    }
  }
}
