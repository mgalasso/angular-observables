import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { BreweryInterface } from '../../brewery.interface';
import { SelectService } from '../select.service';

@Component({
  selector: 'app-select-three',
  templateUrl: './select-three.component.html',
  styleUrls: ['./select-three.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [SelectService],
})
export class SelectThreeComponent {
  breweries!: Array<BreweryInterface>;

  typeChoices = new FormControl();
  brewChoices = new FormControl();

  typeSelection$!: Observable<string>; // now we auto-capture the type selection - no need to subscribe

  constructor(private dataService: SelectService) {
    this.dataService.getBreweries().subscribe((brews) => {
      this.breweries = brews;
    });

    // tap without subscribing - html now listens to typeSelection$ instead of typeChoices.valueChanges
    // this leads into example five for filtering the breweries based on type

    this.typeSelection$ = this.typeChoices.valueChanges.pipe(
      tap((type) => console.log(type))
    );
  }
  clear(): void {
    this.typeChoices.reset();
    this.brewChoices.reset();
  }
}
