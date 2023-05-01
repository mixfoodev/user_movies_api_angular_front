import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/core/interfaces/user.interfaces';
import { UserActions } from '../actions/user.actions';
import { MovieListItem } from 'src/app/core/interfaces/movie.interfaces';
import { initiaUserState } from '../state/app.state';

export const userReducer = createReducer(
  initiaUserState,
  on(
    UserActions.login.userLoginSuccess,
    UserActions.retrieve.userRetrieveSuccess,
    (_, payload) => payload
  ),

  on(UserActions.logout.userLogoutComplete, (state) => undefined),

  on(UserActions.addMovie.userAddmovieSuccess, (state, payload) => ({
    ...(state as User),
    movies: [...(state?.movies as MovieListItem[]), payload],
  })),

  on(UserActions.removeMovie.userRemovemovieSuccess, (state, payload) => ({
    ...(state as User),
    movies: (state?.movies as MovieListItem[]).filter(
      (m) => m.id != payload.id
    ),
  }))
);
