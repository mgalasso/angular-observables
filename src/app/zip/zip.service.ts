import { Injectable } from '@angular/core';
import { zip, of, toArray } from 'rxjs';
import { map } from 'rxjs/operators';

export interface MakeModelCostInterface {
  make: string;
  model: string;
  cost: number;
}

@Injectable()
export class ZipService {
  make$ = of('Ford', 'Honda', 'Toyota');
  model$ = of('Mustang', 'Prelude', 'Prius');
  cost$ = of(30000, 35000, 25000);

  zipped$ = zip(this.make$, this.model$, this.cost$).pipe(
    map(([make, model, cost]) => ({ make, model, cost })),
    toArray()
  );
}
