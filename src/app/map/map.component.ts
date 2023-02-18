import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BreweryInterface } from '../brewery.interface';
import { MapService } from './map.service';

@Component({
  selector: 'app-select-three',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [MapService],
})
export class MapComponent {

  types$ = this.dataService.types$
  breweries$ = this.dataService.breweries$

  typeChoices = new FormControl();
  brewChoices = new FormControl();
  modifiedSelectedType: string;

  // interrupt data flow with a second observable listening for value changes
  tc = this.typeChoices.valueChanges
    .pipe(
      map((type) => type ? type.toUpperCase() : type), // check for null since can clear()
      tap((v) => console.log(`tap (peek) value: ${v}`))
    )
    .subscribe((newValue) => {
      this.modifiedSelectedType = newValue; // can use new value elsewhere in app
    }); // nothing happens without subscribing

  constructor(private dataService: MapService) {
    this.breweries$ = this.dataService.breweries$;
  }

  clear() {
    this.typeChoices.reset();
    this.brewChoices.reset();
  }

  ngOnDestroy(): void {
    this.tc.unsubscribe();
  }
}
