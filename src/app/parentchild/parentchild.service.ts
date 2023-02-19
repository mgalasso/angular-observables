import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  combineLatest,
  forkJoin,
  mergeMap,
  map,
  concatMap,
  Observable,
  of,
  Subject,
  switchMap,
  throwError,
  tap
} from 'rxjs';
export interface WaferInterface {
  wid: number;
  name: string;
}

export interface SupplierInterface {
  sid: number;
  name: string;
  waferId: number;
}

export interface WaferWithSuppliersInteface {
  wafer: WaferInterface,
  suppliers: SupplierInterface[]
}

@Injectable()
export class ParentchildService {
  wafers = [
    { wid: 1, name: 'wafer A' },
    { wid: 2, name: 'wafer B' },
    { wid: 3, name: 'wafer C' },
  ];

  suppliers = [
   
    { sid: 10, name: 'wafer A - supplier 1', waferId: 1 },
    { sid: 20, name: 'wafer A - supplier 2', waferId: 1 },
    { sid: 30, name: 'wafer A - supplier 3', waferId: 1 },
    { sid: 40, name: 'wafer C - supplier 4', waferId: 3 },
    { sid: 50, name: 'wafer C - supplier 5', waferId: 3 },
    { sid: 60, name: 'wafer C - supplier 6', waferId: 3 },

  ];

  wafers$ = of(this.wafers);
  suppliers$ = of(this.suppliers);

  waferSelectedSubject = new Subject<number>();
  waferSelectedAction$ = this.waferSelectedSubject.asObservable();

  // retrieve related data pattern
  selectedWafer$ = this.waferSelectedAction$.pipe(
    switchMap((wid) =>
      this.wafers$
        .pipe(map((w) => w.find((w) => w.wid === wid))) // w => this.http.get<wafer>(`${this.url}/${id})
        .pipe(catchError(this.handleError))
    )
  );

  // 1. Option 1 - switchMap - filter on Wafer ID to get Suppliers
  waferSuppliers$ = this.selectedWafer$.pipe(
    tap(w => console.log(`tap wid: ${w.wid}`)),
    switchMap((w) =>
      this.suppliers$
        .pipe(map((s) => s.filter((s) => (s.waferId === w.wid)))) // `${this.url}/${s.waferId}`
        .pipe(catchError(this.handleError))
    )
  );

  //2. Option 2 - mergeMap -  forkJoin - All Parent Child Records
  waferWithSuppliers$ =  this.wafers$.pipe(
    mergeMap(wafers => forkJoin(wafers.map(wafer =>
    this.suppliers$.pipe(
    map((s) => s.filter((s) => (s.waferId === wafer.wid))),
    map(suppliers => ({
      wafer,
      suppliers
      } as WaferWithSuppliersInteface))
    )))))

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = `An error occured: ${err.error.message}`;
    console.error(err);
    return throwError(() => errorMessage);
  }


}
