import { Component, Input, OnInit } from '@angular/core';
import { Event, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppDataStore } from '../../state-transitions/app-data.store';
import { AppEvent } from '../../state-transitions/app-events.enum';
import { doTransition } from '../../state-transitions/state-transitions';
import { AppData, StateTransitionData } from '../../state-transitions/state-transitions.model';
import { AppViewState } from '../../state-transitions/view-states.enum';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent implements OnInit {

  appData$: Observable<AppData>;
  stData: StateTransitionData;

  constructor(private appDataStore: AppDataStore, private router: Router) {
  }

  ngOnInit(): void {
    this.stData = new StateTransitionData();
    this.stData.preEvent = AppEvent.update_cartcount;
    this.stData = doTransition(this.appDataStore, this.stData);
    if (this.stData.finalState !== AppViewState.UPDATECARTCOUNTSUCCESSVIEW) {
      this.router.navigate(['/**'])
    }
    this.appData$ = this.appDataStore.state$;
  }
}
