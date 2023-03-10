import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ReactiveformComponent implements OnInit {
  myform: FormGroup;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  constructor(private fb: FormBuilder) {
    this.myform = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });
  }
  //  "Validators.email" will only check for @ : use a regex pattern instead

  ngOnInit() {
    this.myform.patchValue({
      firstName: 'Joe',
      lastName: 'Smith',
    });
  }

  submit() {
    console.log('submit', this.myform, this.myform.value, this.myform.valid);
  }
}
