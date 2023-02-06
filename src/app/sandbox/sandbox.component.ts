import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class SandboxComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
