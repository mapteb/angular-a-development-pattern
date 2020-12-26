import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataStore } from '../state-transitions/app-data.store';
import { AppEvent } from '../state-transitions/app-events.enum';
import { doTransition } from '../state-transitions/state-transitions';
import { StateTransitionData } from '../state-transitions/state-transitions.model';
import { AppViewState } from '../state-transitions/view-states.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stData: StateTransitionData;

  constructor(private appDataStore: AppDataStore, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.stData = new StateTransitionData();
    this.stData.initState = this.activatedRoute.snapshot.params.fromView;
    this.stData.preEvent = AppEvent.onload;
    this.stData = doTransition(this.appDataStore, this.stData);
    if (this.stData.finalState !== AppViewState.ONLOADSUCCESSVIEW) {
      this.router.navigate(['/**'])
    }
  }
}
