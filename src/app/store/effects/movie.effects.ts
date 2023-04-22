import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { MovieService } from 'src/app/service/movie/movie.service';
import { MovieActions } from '../actions/movie.actions';
import { omdbToMovie } from 'src/app/utill/mappers/movie.mappers';
import { UserService } from 'src/app/service/user/user.service';
import { ToastActions } from '../actions/app.actions';

@Injectable()
export class MoviesEffects {
  searchMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.movieSearchRequest),
      exhaustMap((payload) =>
        this.movieService.searchMovie(payload.title, payload.selector).pipe(
          map((movie) => {
            if (movie.Error) {
              return ToastActions.toastRequest({
                msg: `Could not find movie "${payload.title}".`,
                success: false,
              });
            }
            return MovieActions.movieSearchSuccess(omdbToMovie(movie));
          }),
          catchError(() =>
            of(
              ToastActions.toastRequest({
                msg: `Could not find movie "${payload.title}".`,
                success: false,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private movieService: MovieService,
    private userService: UserService
  ) {}
}
