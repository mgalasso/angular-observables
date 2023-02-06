import { Component, OnInit } from '@angular/core';
import { ParentchildService, wafer } from './parentchild.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-parentchild',
  templateUrl: './parentchild.component.html',
  styleUrls: ['./parentchild.component.css'],
  standalone: true,
  providers: [ParentchildService],
})
export class ParentchildComponent implements OnInit {
  wafers$: Observable<wafer[]>;
  constructor(private ds: ParentchildService) {
    this.wafers$ = this.ds.wafers$;
  }

  ngOnInit() {}
}
