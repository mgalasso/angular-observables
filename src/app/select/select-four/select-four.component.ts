import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, withLatestFrom, tap } from 'rxjs';
import { BreweryInterface } from '../../brewery.interface';
import { SelectService } from '../select.service';

@Component({
  selector: 'app-select-four',
  templateUrl: './select-four.component.html',
  styleUrls: ['./select-four.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [SelectService],
})
export class SelectFourComponent {
  breweries$!: Observable<BreweryInterface[]>;
  breweries!: Array<BreweryInterface>;
  typeChoices = new FormControl();
  brewChoices = new FormControl();

  typeSelection$!: Observable<string>;

  constructor(private dataService: SelectService) {
    this.breweries$ = this.dataService.getBreweries();

    // we need to combine type selection with latest list of breweries
    // notice type is singular and breweries is plural

    this.typeSelection$ = this.typeChoices.valueChanges.pipe(
      withLatestFrom(this.breweries$),
      map(([type, breweries]) => [
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

/* NOTES

<div *ngIf='users$ | async as users'>
<select (change)='onSelected($any($event.target).value)'>
<option *ngFor='let user of users' [value]=user.id>{{user.name}}</option>

*/
