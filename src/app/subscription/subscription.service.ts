import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';;
import { BreweryInterface } from '../brewery.interface';


@Injectable()
export class SubscriptionService {
  private breweriesUrl = 'https://api.openbrewerydb.org/breweries';

  constructor(private http: HttpClient) {}
  getBreweries(): Observable<BreweryInterface[]> {
    return this.http.get<BreweryInterface[]>(this.breweriesUrl);
  }
}
