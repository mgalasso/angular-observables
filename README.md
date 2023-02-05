# angular-observables

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-ivy-7rzbuq)

CONACT MAP : relay race : must be in order : insert, update and delete

THIS NOT GOOD APPROACH when user undecided and clicks on 3 records because you have to wait until all 3 are finished
todos$ = this.userSelectedAction$.pipe(
    concatMap(userId => 
      this.http.get<ToDo[]>(`${this.todoUrl}/${user.id}`))
)

MERGE MAP - starts at the same time but there is no order : use when criteria doesn't change

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
