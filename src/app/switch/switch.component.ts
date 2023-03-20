import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { UserInterface } from './user.interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
})
export class SwitchComponent {
  users$: Observable<UserInterface[]>;

  selectId = new Subject<number>();
  selectedUser$: Observable<UserInterface>;

  constructor(private ds: UserService) {
    this.users$ = ds.users$;
    this.selectedUser$ = this.selectId.pipe(
      distinctUntilChanged(),
      switchMap((id) => this.ds.getUser(id)) // switch to a completely different observable
    );
  }
}
