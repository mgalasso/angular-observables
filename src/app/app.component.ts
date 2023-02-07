import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplateSwapComponent } from './template-swap/template-swap.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TemplateSwapComponent,
    DashboardComponent,
    AppRoutingModule
  ],
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent {}
