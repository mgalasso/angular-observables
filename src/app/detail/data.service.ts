//https://api.openbrewerydb.org/breweries/madtree-brewing-cincinnati

import { HttpClient } from '@angular/common/http';
import { map, mergeMap, Observable, ObservedValueOf, Subject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { BreweryInterface } from '../brewery.interface';


@Injectable()
export class DataService {
  ///madtree-brewing-cincinnati
  private breweriesUrl = 'https://api.openbrewerydb.org/breweries';

  private subject = new Subject<string>();
  private action$ = this.subject.asObservable();

  constructor(private http: HttpClient) {}

  getBrewery(id: string): Observable<BreweryInterface> {
    return this.action$.pipe(
      tap((d) => console.log('tap', d)),
      mergeMap(() =>
        this.http.get<BreweryInterface>(`${this.breweriesUrl}/${id}`)
      )
    );
  }
}
