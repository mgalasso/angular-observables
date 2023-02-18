import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, of } from 'rxjs';
import { BreweryInterface } from '../brewery.interface';

@Injectable()
export class MapService {
  public types$: Observable<string[]>;
  public breweries$: Observable<BreweryInterface[]>;

  private breweriesUrl = 'https://api.openbrewerydb.org/breweries';
  constructor(private http: HttpClient) {
    this.types$ = of(['micro', 'large']);
    this.breweries$ = this.http
      .get<BreweryInterface[]>(this.breweriesUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = `An error occured: ${err.error.message}`;
    console.error(err);
    return throwError(() => errorMessage);
  }
}
