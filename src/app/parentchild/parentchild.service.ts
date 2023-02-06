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
export interface wafer {
  id: number;
  name: string;
}

@Injectable()
export class ParentchildService {
  wafers = [
    { id: 0, name: 'wafer 1' },
    { id: 1, name: 'wafer 2' },
    { id: 2, name: 'wafer 2' },
  ];

  suppliers = [
    { id: 0, name: 'supplier 1', waferId: 1 },
    { id: 1, name: 'supplier 2', waferId: 1 },
    { id: 2, name: 'supplier 3', waferId: 1 },
  ];

  wafers$ = of(this.wafers);
  suppliers$ = of(this.suppliers);

  private waferSelectedSubject = new Subject<number>();
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
    switchMap((id) =>
      this.wafers$
        .pipe(map((w) => w.find((w) => w.id === id))) // w => this.http.get<wafer>(`${this.url}/${id})
        .pipe(catchError(this.handleError))
    )
  );

  waferSuppliers$ = this.selectedWafer$.pipe(
    switchMap((w) =>
      this.suppliers$
        .pipe(map((s) => s.find((s) => (s.waferId = w.id)))) // `${this.url}/${s.waferId}`
        .pipe(catchError(this.handleError))
    )
  );

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = `An error occured: ${err.error.message}`;
    console.error(err);
    return throwError(() => errorMessage);
  }
}
