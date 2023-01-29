import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BreweryInterface } from '../../brewery.interface';
import { DataService } from './data.service';

@Component({
  selector: 'app-select-three',
  templateUrl: './select-three.component.html',
  styleUrls: ['./select-three.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [DataService],
})
export class SelectThreeComponent {
  breweries!: Array<BreweryInterface>;

  typeChoices = new FormControl();
  brewChoices = new FormControl();

  constructor(private dataService: DataService) {
    this.dataService.getBreweries().subscribe((brews) => {
      this.breweries = brews;
    });

    // same as select-two example but learning about map and tap operators

    // map example
    this.typeChoices.valueChanges
      .pipe(map((type) => type.toUpperCase()))
      .subscribe((newValue) => {
        alert(newValue);
      });

    // tap with subscribing
    this.typeChoices.valueChanges
      .pipe(tap((type) => console.log(type)))
      .subscribe((newValue) => {}); // take away subscribe and ASK if it will show in console
  }
}
