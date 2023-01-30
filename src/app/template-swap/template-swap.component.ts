import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { DataClass } from '../data';

@Component({
  selector: 'app-template-swap',
  templateUrl: './template-swap.component.html',
  styleUrls: ['./template-swap.component.css'],
  standalone: true,
  providers: [DataClass],
  imports: [NgTemplateOutlet],
})
export class TemplateSwapComponent {
  // @ViewChild('reference', { read: ViewContainerRef })
  // reference!: ViewContainerRef;
  // @ViewChild('defaultContent') contentTemplate!: TemplateRef<any>;
  // ngAfterViewInit() {
  //   this.reference.createEmbeddedView(this.contentTemplate);
  // }
  state: DataClass;
  constructor(public data: DataClass) {
    this.state = data;
  }

  @Input() incomingContent!: TemplateRef<DataClass>;
}
