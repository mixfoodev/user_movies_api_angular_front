import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { UserActions } from '../actions/user.actions';
import { UserService } from 'src/app/core/service/user/user.service';
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
          map((user) => UserActions.login.userLoginSuccess(user)),
          catchError((resp) => of(UserActions.login.userLoginError(resp)))
        )
      )
    )
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout.userLogoutRequest),
      exhaustMap(() =>
        this.userService.logoutUser().pipe(
          map(() => UserActions.logout.userLogoutComplete()),
          catchError(() => of(UserActions.logout.userLogoutComplete()))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.create.userCreateRequest),
      exhaustMap((payload) =>
        this.userService.createUser(payload.username, payload.password).pipe(
          map(() => UserActions.create.userCreateSuccess()),
          catchError((error) => of(UserActions.create.userCreateError(error)))
        )
      )
    )
  );

  retrieveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.retrieve.userRetrieveRequest),
      exhaustMap(() =>
        this.userService.getUserSession().pipe(
          map((user) => UserActions.retrieve.userRetrieveSuccess(user)),
          catchError((error) =>
            of(UserActions.retrieve.userRetrieveError(error))
          )
        )
      )
    )
  );

  refreshUserSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          MovieActions.movieSearchRequest,
          MovieActions.movieSearchFavoriteRequest
        ),
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
            map((movie) => UserActions.addMovie.userAddmovieSuccess(movie)),
            catchError((error) =>
              of(UserActions.addMovie.userAddmovieError(error))
            )
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
            map((movie) =>
              UserActions.removeMovie.userRemovemovieSuccess(movie)
            ),
            catchError((error) =>
              of(UserActions.removeMovie.userRemovemovieError(error))
            )
          )
      )
    )
  );

  showUserIsInactiveOrLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserActions.retrieve.userRetrieveError,
        UserActions.addMovie.userAddmovieError,
        UserActions.removeMovie.userRemovemovieError
      ),
      map((error) => {
        if (error.status === 401) return UserActions.retrieve.userInactive();
        return UserActions.logout.userLogoutComplete();
      })
    )
  );

  unsetUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.retrieve.userInactive),
      map(() => UserActions.logout.userLogoutComplete())
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
      map((resp) => {
        const msg = resp.error?.error ?? 'Could not reach server!';
        return ToastActions.toastRequest({
          msg,
          success: false,
        });
      })
    )
  );

  userCreateError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.create.userCreateError),
      map((resp) => {
        if (resp?.status === 401) return UserActions.retrieve.userInactive();

        const msg = resp.error?.error + '!' ?? 'Some error occurred!';
        return ToastActions.toastRequest({
          msg,
          success: false,
        });
      })
    )
  );
}
