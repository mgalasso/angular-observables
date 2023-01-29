import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, withLatestFrom, tap } from 'rxjs';
import { BreweryInterface } from '../../brewery.interface';
import { DataService } from './data.service';

@Component({
  selector: 'app-select-five',
  templateUrl: './select-five.component.html',
  styleUrls: ['./select-five.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [DataService],
})
export class SelectFiveComponent {
  breweries$!: Observable<BreweryInterface[]>;
  breweries!: Array<BreweryInterface>;
  typeChoices = new FormControl();
  brewChoices = new FormControl();

  typeSelection$!: Observable<string>;

  constructor(private dataService: DataService) {
    this.breweries$ = this.dataService.getBreweries();

    // map example
    this.typeChoices.valueChanges
      .pipe(map((type) => type.toUpperCase()))
      .subscribe((newValue) => {});

    // discuss MERGE, FILTER, COMBINELATEST operator
    this.typeSelection$ = this.typeChoices.valueChanges.pipe(
      withLatestFrom(this.breweries$), // we combine type selection with latest list of breweries
      map(([type, breweries]) => [
        // now we have an array of two values
        type,
        breweries.filter((b) => b.brewery_type == type),
      ]),
      tap(([type, filteredBreweries]) => {
        this.breweries = filteredBreweries;
        this.brewChoices.setValue(
          `${filteredBreweries[0].name} - ${filteredBreweries[0].brewery_type}`
        );
      }),
      map(([type]) => type)
    );
  }
}
