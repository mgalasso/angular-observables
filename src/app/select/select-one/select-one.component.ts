import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreweryInterface } from '../../brewery.interface';
import { SelectService } from '../select.service';

@Component({
  selector: 'app-select-one',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [SelectService],
  templateUrl: './select-one.component.html',
  styleUrls: ['./select-one.component.css'],
})
export class SelectOneComponent implements OnInit {
  typeChoices = new FormControl();
  brewChoices = new FormControl();
  breweries!: Array<BreweryInterface>;

  // old way
  typeSelection!: string;
  brewerySelection!: string;

  constructor(private ds: SelectService) {
    this.ds.getBreweries().subscribe((brews) => {
      this.breweries = brews;
    });

    this.typeChoices.valueChanges.subscribe((newValue) => {
      this.typeSelection = newValue;
    });

    this.brewChoices.valueChanges.subscribe((newValue) => {
      this.brewerySelection = newValue;
    });
  }

  ngOnInit() {}
}
