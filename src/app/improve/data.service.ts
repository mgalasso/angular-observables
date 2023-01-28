import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { Injectable } from '@angular/core';

export interface BreweryInterface {
  id: string;
  name: string;
  brewert_type: string;
}
@Injectable()
export class DataService {
  private breweriesUrl = 'https://api.openbrewerydb.org/breweries';
  public breweries$: Observable<BreweryInterface[]>;
  constructor(private http: HttpClient) {
    this.breweries$ = this.http.get<BreweryInterface[]>(this.breweriesUrl);
  }
}
