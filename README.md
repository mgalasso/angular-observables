# angular-observables

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-ivy-7rzbuq)

1. CONACT MAP : like a relay race : order matters

THIS NOT GOOD APPROACH: on multiple clicks you have to wait until all 3 are finished : user switchMap instead
todos$ = this.userSelectedAction$.pipe(
    concatMap(userId => 
      this.http.get<Suppliers[]>(`${this.url}/${wafer.id}`))
)

MERGE MAP - starts at the same time but there is no order : fastest results show up first
so, use only when criteria doesn't change - meaning, when there are no multiple clicks



FORK JOIN : parent-detail Data

usersWithTodos$ = this.http.get<User[]>(this.userUrl).pipe(
mergeMap(users => forkJoin(users.map(user =>
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
