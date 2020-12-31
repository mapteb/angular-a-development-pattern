import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataStore } from 'src/app/state-transitions/app-data.store';
import { AppEvent } from 'src/app/state-transitions/app-events.enum';
import { doTransition } from 'src/app/state-transitions/state-transitions';
import { StateTransitionData } from 'src/app/state-transitions/state-transitions.model';
import { AppViewState } from 'src/app/state-transitions/view-states.enum';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  @Output() productId: number;
  @Output() fromView: string;
  
  cartMessage: string = "";
  stData: StateTransitionData;

  constructor(
    private appDataStore: AppDataStore,
    private activatedRoute: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.stData = new StateTransitionData();
    this.stData.productId = Number(this.activatedRoute.snapshot.params.id);
    this.stData.preEvent = AppEvent.add_to_cart;
    this.stData = doTransition(this.appDataStore, this.stData);
    if (this.stData.finalState !== AppViewState.ADDTOCARTSUCCESSVIEW) {
      this.router.navigate(['/**'])
    }
    this.cartMessage = "Add to cart success";
    this.productId = this.stData.productId;
    this.fromView = AppViewState.ADDTOCARTSUCCESSVIEW;
  }
}
