import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AppDataStore } from './state-transitions/app-data.store';
import { AppData } from './state-transitions/state-transitions.model';
import { AppViewState } from './state-transitions/view-states.enum';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

  title = "Angular View Transitions";
  appData$: Observable<AppData>;

  constructor(private appDataStore: AppDataStore, private router: Router) {
    this.appData$ = this.appDataStore.state$;
  }

  ngOnInit(): void {
    
    this.router.navigate(["/home"]);
  }
}
