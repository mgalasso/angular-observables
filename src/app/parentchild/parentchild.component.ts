import { Component, OnInit } from '@angular/core';
import {
  ParentchildService,
  SupplierInterface,
  WaferInterface,
} from './parentchild.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parentchild',
  templateUrl: './parentchild.component.html',
  styleUrls: ['./parentchild.component.css'],
  standalone: true,
  providers: [ParentchildService],
  imports: [CommonModule],
})
export class ParentchildComponent implements OnInit {
  wafers$: Observable<WaferInterface[]>;
  selectedWafer$ = this.ds.selectedWafer$;

  waferSuppliers$: Observable<SupplierInterface[]>;
  waferWithSuppliers$ = this.ds.waferWithSuppliers$;

  constructor(private ds: ParentchildService) {
    this.wafers$ = this.ds.wafers$;
    this.waferSuppliers$ = this.ds.waferSuppliers$;
  }

  ngOnInit() {}

  selectedWafer(w: WaferInterface): void {
    console.log('selected', w);
    this.ds.waferSelectedSubject.next(w.wid);
  }
}
