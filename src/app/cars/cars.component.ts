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
  vehicles$!: Observable<VehicleInterface[]>;
  makes$: Observable<string[]>;

  selectedVehicle$: Observable<VehicleInterface>;

  private makeSubject = new BehaviorSubject<string>('');
  makeAction$ = this.makeSubject.asObservable();

  // One Simple Approach - filters the cars based on make
  selectedMake$ = this.makeAction$.pipe(
    switchMap((make) =>
      this.vehicles$
        .pipe(map((v) => v.filter((f) => f.vehicleClass === make)))
        .pipe(catchError(this.handleError))
    )
  );

  filteredVehicles$: Observable<VehicleInterface[]>;

  constructor(private ds: CarService) {
    this.makes$ = this.ds.makes$;
    this.vehicles$ = this.ds.vehicles$;

    // another approach to filter the cars based on make but this time using combine latest
    this.filteredVehicles$ = combineLatest([
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
  }

  selectedMake(make: string): void {
    this.makeSubject.next(make);
  }

  private handleError(err: any): Observable<never> {
    let errorMessage = `An error occured: ${err.error.message}`;
    console.error(err);
    return throwError(() => errorMessage);
  }
}
