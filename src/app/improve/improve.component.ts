import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  Observable,
  Subject,
  Subscription,
  tap,
} from 'rxjs';
import { BreweryInterface } from '../brewery.interface';
import { DataService } from './data.service';

@Component({
  selector: 'app-improve',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [DataService],
  templateUrl: './improve.component.html',
  styleUrls: [],
})
export class ImproveComponent {
  breweries$!: Observable<BreweryInterface[]>;

  constructor(private ds: DataService, private http: HttpClient) {
    this.breweries$ = this.ds.breweries$;
  }

  // detail record - use action streams NO data service
  private brewerySelectSubject = new Subject<string>();
  brewerySelectedAction$ = this.brewerySelectSubject.asObservable();

  selectedBrewery(b: BreweryInterface): void {
    this.brewerySelectSubject.next(b.id);
  }

  private breweriesUrl = 'https://api.openbrewerydb.org/breweries';
  selectedBrewery$ = this.brewerySelectedAction$.pipe(
    switchMap((id) =>
      this.http.get<BreweryInterface>(`${this.breweriesUrl}/${id}`)
    )
  );

  // detail record - use action streams with DATA SERVICE

  selectedBreweryDS(b: BreweryInterface): void {
    this.ds.brewerySelectSubject.next(b.id);
  }
  selectedBreweryDS$ = this.ds.selectedBreweryDS$;
}
