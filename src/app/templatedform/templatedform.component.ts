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
  detail = { firstname: 'Joe', lastname: 'Smith', email: '' };
  submit(form) {
    console.log('submit', form.value);
    console.log('valid', form.valid);
  }
}
