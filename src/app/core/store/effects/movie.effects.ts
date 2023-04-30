import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { MovieService } from 'src/app/core/service/movie/movie.service';
import { MovieActions } from '../actions/movie.actions';
import { omdbToMovie } from 'src/app/utill/mappers/movie.mappers';
import { UserService } from 'src/app/core/service/user/user.service';
import { ToastActions } from '../actions/app.actions';

@Injectable()
export class MoviesEffects {
  searchMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MovieActions.movieSearchRequest,
        MovieActions.movieSearchFavoriteRequest
      ),
      exhaustMap((payload) =>
        this.movieService.searchMovie(payload.title, payload.selector).pipe(
          map((movie) => {
            if (movie.Error) {
              /*  return ToastActions.toastRequest({
                msg: `Could not find movie "${payload.title}".`,
                success: false,
              }); */
              return MovieActions.movieSearchError({
                error: `Could not find movie "${payload.title}".`,
              });
            }
            return MovieActions.movieSearchSuccess(omdbToMovie(movie));
          }),
          catchError(() =>
            of(
              MovieActions.movieSearchError({
                error: `Could not find movie "${payload.title}".`,
              })
              /* ToastActions.toastRequest({
                msg: `Could not find movie "${payload.title}".`,
                success: false,
              }) */
            )
          )
        )
      )
    )
  );

  searchMovieFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.movieSearchError),
      map(({ error }) =>
        ToastActions.toastRequest({
          msg: error,
          success: false,
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private movieService: MovieService,
    private userService: UserService
  ) {}
}
