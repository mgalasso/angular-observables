import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { switchMap, Observable, Subject } from 'rxjs';
import { BreweryInterface } from '../brewery.interface';
import { AsyncService } from './async.service';

@Component({
  selector: 'app-async',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [AsyncService],
  templateUrl: './async.component.html',
  styleUrls: [],
})
export class AsyncComponent {
  breweries$!: Observable<BreweryInterface[]>; // subscription not needed - use observable for the async pipe
  selectedBrewery$ = this.ds.selectedBrewery$;

  constructor(private ds: AsyncService, private http: HttpClient) {
    this.breweries$ = this.ds.breweries$; // direct assignment - no need for a function call
  }

  selectedBrewery(b: BreweryInterface): void {
    this.ds.brewerySelectSubject.next(b.id); // subjects are your custom created observables
  }
}
