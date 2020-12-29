import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, concatMap, exhaustMap, map} from 'rxjs/operators'
import {of} from 'rxjs'
import {UsersService} from '../../services/users.service'
import * as UserActions from '../actions/user.actions'

@Injectable()
export class UserEffects {


  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      exhaustMap(action =>
        this.service.getAll().pipe(
          map(u => UserActions.getUsersSuccess({users: u})),
          catchError((error: any) => of(UserActions.getUsersFailure(error)))
        ))
    )
  )

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.deleteUser),
    concatMap(action =>
      this.service.remove(action.userId))
    ),
    {dispatch: false}
  )


  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.editUser),
      exhaustMap(action =>
        this.service.update(action.user).pipe(
          map(response => {
            console.log(response);
            return UserActions.editUserSuccess(response)}),
          catchError((error: any) => of(UserActions.editUserFailure(error))))
      )
    )
  )

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      exhaustMap(action =>
        this.service.create(action.user).pipe(
          map(response => {
            console.log(response);
            return UserActions.createUserSuccess(response)}),
          catchError((error: any) => of(UserActions.createUserFailure(error))))
      )
    )
  )


  constructor(private actions$: Actions, private service: UsersService) {
  }
}
