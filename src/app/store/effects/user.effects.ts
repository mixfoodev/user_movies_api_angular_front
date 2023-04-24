import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { UserActions } from '../actions/user.actions';
import { UserService } from 'src/app/service/user/user.service';
import { toMovieListItem } from 'src/app/utill/mappers/movie.mappers';
import { MovieActions } from '../actions/movie.actions';
import { ToastActions } from '../actions/app.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login.userLoginRequest),
      exhaustMap((payload) =>
        this.userService.loginUser(payload.username, payload.password).pipe(
          map((user) => {
            return UserActions.login.userLoginSuccess(user);
          }),
          catchError((resp) =>
            of(
              UserActions.login.userLoginError(resp)
              /* ToastActions.toastRequest({
                msg: resp.error.error + '!',
                success: false,
              }) */
            )
          )
        )
      )
    )
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout.userLogoutRequest),
      exhaustMap(() =>
        this.userService.logoutUser().pipe(
          map(() => {
            return UserActions.logout.userLogoutSuccess();
          }),
          catchError((error) => {
            if (error.status === 401)
              return of(UserActions.retrieve.userInactive());
            return EMPTY;
          })
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.create.userCreateRequest),
      exhaustMap((payload) =>
        this.userService.createUser(payload.username, payload.password).pipe(
          map(() => {
            return UserActions.create.userCreateSuccess();
          }),
          catchError((error) => {
            if (error.status === 401)
              return of(UserActions.retrieve.userInactive());
            return EMPTY;
          })
        )
      )
    )
  );

  retrieveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.retrieve.userRetrieveRequest),
      exhaustMap(() =>
        this.userService.getUserSession().pipe(
          map((user) => {
            return UserActions.retrieve.userRetrieveSuccess(user);
          }),
          catchError((error) => {
            // JWT has been expired
            if (error.status === 401)
              return of(UserActions.retrieve.userInactive());
            // JWT does not exist
            return EMPTY;
          })
        )
      )
    )
  );

  refreshUserSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MovieActions.movieSearchRequest),
        exhaustMap(() => this.userService.refreshUserSession())
      ),
    { dispatch: false }
  );

  addUserMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addMovie.userAddmovieRequest),
      exhaustMap((payload) =>
        this.userService
          .addMovieToUser(payload.userId, toMovieListItem(payload.movie))
          .pipe(
            map((movie) => {
              return UserActions.addMovie.userAddmovieSuccess(movie);
            }),
            catchError((error) => {
              if (error.status === 401)
                return of(UserActions.retrieve.userInactive());
              return EMPTY;
              // todo na bgalw to formsenderror kai na kanw sto kathena to diko tou error pou na akouei
              // ena effect kai ayto an einai na kanei dispatch gia to toast
            })
          )
      )
    )
  );

  removeUserMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.removeMovie.userRemovemovieRequest),
      exhaustMap((payload) =>
        this.userService
          .removeMovieFromUser(payload.userId, payload.movieId)
          .pipe(
            map((movie) => {
              return UserActions.removeMovie.userRemovemovieSuccess(movie);
            }),
            catchError((error) => {
              if (error.status === 401)
                return of(UserActions.retrieve.userInactive());
              return EMPTY;
            })
          )
      )
    )
  );

  unsetUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.retrieve.userInactive),
      map(() => UserActions.logout.userLogoutSuccess())
    )
  );

  showUserIsInactive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.retrieve.userInactive),
      map(() =>
        ToastActions.toastRequest({
          msg: 'You have been inactive for too long..Please login.',
          success: false,
        })
      )
    )
  );

  createUserSuccessMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.create.userCreateSuccess),
      map(() =>
        ToastActions.toastRequest({
          msg: 'User added successfully!',
          success: true,
        })
      )
    )
  );

  addUserMovieSuccessMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addMovie.userAddmovieSuccess),
      map(() =>
        ToastActions.toastRequest({
          msg: 'Movie added successfully!',
          success: true,
        })
      )
    )
  );

  removeUserMovieSuccessMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.removeMovie.userRemovemovieSuccess),
      map(() =>
        ToastActions.toastRequest({
          msg: 'Movie removed successfully!',
          success: true,
        })
      )
    )
  );

  userLoginError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login.userLoginError),
      map((resp) =>
        ToastActions.toastRequest({
          msg: resp.error.error,
          success: false,
        })
      )
    )
  );
}
