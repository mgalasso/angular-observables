import { of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface VehicleInterface {
  vehicleClass: string;
  vehicleModel: string;
}

@Injectable()
export class CarService {

  vehicles =  [
    { vehicleClass: 'Ford', vehicleModel: 'Taurus' },
    { vehicleClass: 'Ford', vehicleModel: 'Mustang' },
    { vehicleClass: 'Dodge', vehicleModel: 'Ram' },
    { vehicleClass: 'Dodge', vehicleModel: 'Hornet' },
  ]
  vehicles$ = of(this.vehicles)
  
}
