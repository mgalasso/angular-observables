import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
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
  breweries!: Array<BreweryInterface>;

  typeChoices = new FormControl();
  brewChoices = new FormControl();

  typeSelection$!: Observable<string>;

  constructor(private dataService: SelectService) {
    this.dataService.getBreweries().subscribe((brews) => {
      this.breweries = brews;
    });

    // map example
    this.typeChoices.valueChanges
      .pipe(map((type) => type.toUpperCase()))
      .subscribe((newValue) => {
        alert(newValue);
      });

    // tap without subscribing
    this.typeSelection$ = this.typeChoices.valueChanges.pipe(
      tap((type) => console.log(type))
    );
  }
}
