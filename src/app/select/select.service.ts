import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BreweryInterface } from '../brewery.interface';

@Injectable()
export class SelectService {
  private url = 'https://api.openbrewerydb.org/breweries';
  constructor(private http: HttpClient) {}

  getBreweries() {
    return this.http.get<BreweryInterface[]>(this.url);
  }
}
