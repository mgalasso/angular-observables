import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreweryInterface } from '../brewery.interface';
import { SubscriptionService } from './subscription.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [SubscriptionService],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit, OnDestroy {
  sub$!: Subscription; // one variable to subscribe and unsubscribe
  breweries!: BreweryInterface[]; // another variable to hold static data

  constructor(private ds: SubscriptionService) {}

  ngOnInit(): void {
    this.sub$ = this.ds
      .getBreweries()
      .subscribe((data) => (this.breweries = data)); // this will stop the data flow into static variable
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe(); // forgetting to unsubscribe will cause memory leak
  }
}
