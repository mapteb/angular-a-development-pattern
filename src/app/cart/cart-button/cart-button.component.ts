import { Component, Input, OnInit } from '@angular/core';
import { Event, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppDataStore } from 'src/app/state-transitions/app-data.store';
import { AppData } from 'src/app/state-transitions/state-transitions.model';
import { AppViewState } from 'src/app/state-transitions/view-states.enum';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent implements OnInit {

  appData$: Observable<AppData>;

  constructor(private appDataStore: AppDataStore, private router: Router) {
  }

  ngOnInit(): void {
    this.appData$ = this.appDataStore.state$;
  }
}
