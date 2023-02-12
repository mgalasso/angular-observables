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
  vehicles$: Observable<VehicleInterface[]>;
  filteredVehicles$: Observable<VehicleInterface[]>;
  selectedVehicle$: Observable<VehicleInterface>;

  private vClassSubject = new BehaviorSubject<string>('');
  vehicleClass$ = this.vClassSubject.asObservable();

  constructor(private ds: CarService) {
    this.vehicles$ = this.ds.vehicles$;

    // this.filteredVehicles$ = combineLatest([
    //   this.vehicles$,
    //   this.vehicleClass$,
    // ]).pipe(
    //   map(([vehicles, selectedClass]) =>
    //     vehicles.filter((v) =>
    //       selectedClass ? v.vehicleClass.includes(selectedClass) : true
    //     )
    //   ),
    //   catchError((err) => err)
    // );
  }

  selectedClass(vechicleClass: string): void {
    this.vClassSubject.next(vechicleClass);
  }
}
