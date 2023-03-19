import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { UserInterface } from './user.interface';

@Injectable()
export class UserService {
  public users$: Observable<UserInterface[]>;

  constructor() {
    this.users$ = of([
      { id: 1, name: 'Mike' },
      { id: 2, name: 'Michele' },
      { id: 3, name: 'Mario' },
    ]);
  }

  getUser(id: number): Observable<UserInterface> {
    return this.users$.pipe(map((users) => users.find((u) => u.id === id)));
  }
}
