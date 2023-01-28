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
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [DataService],
  templateUrl: './detail.component.html',
  styleUrls: [],
})
export class DetailComponent {
  brewery$!: Observable<BreweryInterface>;

  constructor(private ds: DataService) {
   this.brewery$ = this.ds.getBrewery('madtree-brewing-cincinnati');
   
  }

  ngOnInit(): void {}
}
