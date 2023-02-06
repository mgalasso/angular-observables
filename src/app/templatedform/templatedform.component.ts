import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-templatedform',
  templateUrl: './templatedform.component.html',
  styleUrls: ['./templatedform.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TemplatedformComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
