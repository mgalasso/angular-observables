import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateSwapComponent } from './template-swap/template-swap.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TemplateSwapComponent],
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent {

}
