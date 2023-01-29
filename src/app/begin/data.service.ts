import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { Injectable } from '@angular/core';
import { BreweryInterface } from '../brewery.interface';


@Injectable()
export class DataService {
  private breweriesUrl = 'https://api.openbrewerydb.org/breweries';

  constructor(private http: HttpClient) {}
  getBreweries(): Observable<BreweryInterface[]> {
    return this.http.get<BreweryInterface[]>(this.breweriesUrl);
  }
}
