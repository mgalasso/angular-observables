import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  Observable,
  Subject,
  Subscription,
  tap,
} from 'rxjs';
import { BreweryInterface, DataService } from './data.service';

@Component({
  selector: 'app-begin',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [DataService],
  templateUrl: './begin.component.html',
  styleUrls: [],
})
export class BeginComponent {
  sub$!: Subscription;
  breweries!: BreweryInterface[];

  constructor(private ds: DataService) {}

  ngOnInit(): void {
    this.sub$ = this.ds
      .getBreweries()
      .subscribe((data) => (this.breweries = data));
  }
}
