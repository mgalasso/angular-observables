import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  of,
  catchError,
  Observable,
  pipe,
  async,
  switchMap,
  throwError,
} from 'rxjs';
import { filter, map, scan, distinct } from 'rxjs/operators';
import { CarService, VehicleInterface } from './cars.service';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [CarService],
})

// combineLatest = combine latest VALUES
export class CarsComponent {
  vehicles$ = this.ds.vehicles$;
  makes$ = this.ds.makes$;

  // Handle selecting a Make with two statements linked together
  private makeSubject = new BehaviorSubject<string>('');
  makeAction$ = this.makeSubject.asObservable();

  // Show Models by Make using just a filter
  filteredByMake$ = this.makeAction$.pipe(
    switchMap((make) =>
      this.vehicles$
        .pipe(map((v) => v.filter((f) => f.vehicleClass === make)))
        .pipe(catchError(this.handleError))
    )
  );

  // Or you can show Models by Make using both combine latest and filter
  // this way you at least have the full list showing before the user selects a Make
  filteredUsingCombineLatest$ = combineLatest([
    this.vehicles$,
    this.makeAction$,
  ]).pipe(
    map(([vehicles, selectedMake]) =>
      vehicles.filter((v) =>
        selectedMake ? v.vehicleClass.includes(selectedMake) : true
      )
    ),
    catchError((err) => err)
  ) as Observable<VehicleInterface[]>;

  constructor(private ds: CarService) {}

  selectedMake(make: string): void {
    this.makeSubject.next(make);
  }

  private handleError(err: any): Observable<never> {
    let errorMessage = `An error occured: ${err.error.message}`;
    console.error(err);
    return throwError(() => errorMessage);
  }
}
