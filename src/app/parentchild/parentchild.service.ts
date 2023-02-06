import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  throwError,
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

@Injectable()
export class ParentchildService {
  wafers = [
    { wid: 0, name: 'wafer 1' },
    { wid: 1, name: 'wafer 2' },
    { wid: 2, name: 'wafer 3' },
  ];

  suppliers = [
    { sid: 0, name: 'supplier 1 of wafer 2', waferId: 1 },
    { sid: 1, name: 'supplier 2 of wafer 2', waferId: 1 },
    { sid: 2, name: 'supplier 3 of wafer 2', waferId: 1 },
  ];

  wafers$ = of(this.wafers);
  suppliers$ = of(this.suppliers);

  waferSelectedSubject = new Subject<number>();
  waferSelectedAction$ = this.waferSelectedSubject.asObservable();

  // shape on action pattern - non parent child - just an example of combine latest operator
  // selectedWafer$ = combineLatest([
  //   this.wafers$,
  //   this.waferSelectedAction$,
  // ]).pipe(
  //   map(([wafers, selectedWaferId]) =>
  //     wafers.find((w) => w.id === selectedWaferId)
  //   )
  // );

  // retrieve related data pattern
  selectedWafer$ = this.waferSelectedAction$.pipe(
    switchMap((wid) =>
      this.wafers$
        .pipe(map((w) => w.find((w) => w.wid === wid))) // w => this.http.get<wafer>(`${this.url}/${id})
        .pipe(catchError(this.handleError))
    )
  );

  waferSuppliers$ = this.selectedWafer$.pipe(
    switchMap((w) =>
      this.suppliers$
        .pipe(map((s) => s.filter((s) => (s.waferId = w.wid)))) // `${this.url}/${s.waferId}`
        .pipe(catchError(this.handleError))
    )
  );

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = `An error occured: ${err.error.message}`;
    console.error(err);
    return throwError(() => errorMessage);
  }
}
