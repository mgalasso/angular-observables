import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-templatedform',
  templateUrl: './templatedform.component.html',
  styleUrls: ['./templatedform.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TemplatedformComponent {
  constructor() {}
  detail = { firstName: 'Joe', lastName: 'Smith', email: '' };
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  submit(form) {
    console.log('submit', form, form.value, form.valid);
  }
}
