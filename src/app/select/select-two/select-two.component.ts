import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreweryInterface } from '../../brewery.interface';
import { SelectService } from '../select.service';

@Component({
  selector: 'app-select-two',
  templateUrl: './select-two.component.html',
  styleUrls: ['./select-two.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [SelectService],
})
export class SelectTwoComponent {
  breweries!: Array<BreweryInterface>;

  typeChoices = new FormControl();
  brewChoices = new FormControl();

  constructor(private dataService: SelectService) {
    this.dataService.getBreweries().subscribe((brews) => {
      this.breweries = brews;
    });
  }
}
