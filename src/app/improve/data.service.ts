import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  Observable,
  ObservedValueOf,
  Subject,
  switchMap,
  throwError,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { BreweryInterface } from '../brewery.interface';

@Injectable()
export class DataService {
  private breweriesUrl = 'https://api.openbrewerydb.org/breweries';
  public breweries$: Observable<BreweryInterface[]>;

  constructor(private http: HttpClient) {
    // main list of breweries
    this.breweries$ = this.http
      .get<BreweryInterface[]>(this.breweriesUrl)
      .pipe(catchError(this.handleError));
  }

  // detail record

  public brewerySelectSubject = new Subject<string>();
  public brewerySelectedAction$ = this.brewerySelectSubject.asObservable();

  // switchMap: stops and switches to latest emission : use when latest emission is needed
  public selectedBreweryDS$ = this.brewerySelectedAction$.pipe(
    switchMap((id) =>
      this.http.get<BreweryInterface>(`${this.breweriesUrl}/${id}`)
    ),
    catchError(this.handleError)
  );

  // never: emits not items and never completes: because we get odd return value if using type other than never

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = `An error occured: ${err.error.message}`;
    console.error(err);
    return throwError(() => errorMessage);
  }
  /* NOTES 

  CONACT MAP : relay race : must be in order : insert, update and delete
  
  THIS NOT GOOD APPROACH when user undecided and  clicks on 3 records because you have to wait until all 3 are finished
  todos$ = this.userSelectedAction$.pipe(
    concatMap(userId => 
      this.http.get<ToDo[]>(`${this.todoUrl}/${user.id}`))
  )

  MERGE MAP -  starts at the same time but there is no order : use when criteria doesn't change
  




  FORK JOIN : parent-detail Data

  usersWithTodos$ = this.http.get<User[]>(this.userUrl).pipe(
    mergeMap(users => forkJoin(users.map(uer =>
      this.http.get<ToDo[]>(`${this.todoUrl}/${user.id}`)
      .pipe(
        map(todos => ({
          user,
          todos
        } as UserData))
      ))))
  )


  COMBINE LATEST : combine two or more streams to have one template pipe for easy access on template

   vm$ = combineLatest([
     this.selectedUser$,
     this.todos$
   ]).pipe(([user,todos]) => ({user, todos}))



   ZIP - for handling key value pairs
   userDetail$ = zip([
     this.user$,
     this.profile$
   ]).pipe(
     map(([user, profile]) => ({user, profile}))
   )


   AVOID NESTING SUBSCRIBTIONS unless using a higher order mapping operator

   user?: User
   todos: ToDo[] = []

   getUser(userName: string): void {
     this.http.get<User>(`${this.userUrl}/${userName}`).pipe(
       switchMap(user =>
        this.http.get<ToDo[]>(`${this.todoUrl}?userId=${user.id}`).pipe(
        ))).subscribe()
   }

   switchMap is the Higher Order Mapping operator
   Compare this approach with FORK JOIN - all users
   This approach is concerned with only one user and their todos.

   More Info: https://www.youtube.com/watch?v=rQTSMbeqv7I
  */
}
