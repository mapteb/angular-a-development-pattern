import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { AppRole } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private location: Location) { }

  public getUserRoles(id: string): Observable<string[]> {
    //TODO: call a REST service to get the user roles
    return of([AppRole.ADMIN]);
  }
}
