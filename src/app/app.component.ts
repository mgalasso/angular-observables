import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent {}
