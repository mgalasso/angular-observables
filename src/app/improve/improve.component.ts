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

  constructor(private ds: DataService) {
    this.breweries$ = this.ds.breweries$;
  }

  ngOnInit(): void {}
}
