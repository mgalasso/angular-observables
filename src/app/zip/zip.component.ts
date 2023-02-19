import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ZipService } from './zip.service';

@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [ZipService],
})
export class ZipComponent {}
