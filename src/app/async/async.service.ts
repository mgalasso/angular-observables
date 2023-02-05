import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  Observable,
  Subject,
  switchMap,
  throwError,
  map,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { BreweryInterface } from '../brewery.interface';

@Injectable()
export class AsyncService {
  private breweriesUrl = 'https://api.openbrewerydb.org/breweries';
  public breweries$: Observable<BreweryInterface[]>;

  constructor(private http: HttpClient) {
    // main list of breweries
    this.breweries$ = this.http
      .get<BreweryInterface[]>(this.breweriesUrl)
      .pipe(catchError(this.handleError));
  }

  // detail record

  public brewerySelectSubject = new Subject<string>();
  public brewerySelectedAction$ = this.brewerySelectSubject.asObservable();

  // switchMap: stops and switches to latest emission : use when latest emission is needed
  public selectedBrewery$ = this.brewerySelectedAction$.pipe(
    switchMap((id) =>
      this.http.get<BreweryInterface>(`${this.breweriesUrl}/${id}`)
    ),
    catchError(this.handleError)
  );

  // never: emits no items and never completes: because we get odd return value if using type other than never

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = `An error occured: ${err.error.message}`;
    console.error(err);
    return throwError(() => errorMessage);
  }
}
