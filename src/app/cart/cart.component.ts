import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppDataStore } from '../state-transitions/app-data.store';
import { AppEvent } from '../state-transitions/app-events.enum';
import { doTransition } from '../state-transitions/state-transitions';
import { AppData, StateTransitionData } from '../state-transitions/state-transitions.model';
import { AppViewState } from '../state-transitions/view-states.enum';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  appData$: Observable<AppData>;

  stData: StateTransitionData;

  constructor(private appDataStore: AppDataStore, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.stData = new StateTransitionData();
    this.stData.initState = this.activatedRoute.snapshot.params.fromView;
    this.stData.preEvent = AppEvent.get_cart;
    this.stData = doTransition(this.appDataStore, this.stData);
    if (this.stData.finalState !== AppViewState.CARTVIEW) {
      this.router.navigate(['/**'])
    }
    this.appData$ = this.appDataStore.state$;
  }
}
