import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/core/interfaces/user.interfaces';
import { UserActions } from '../actions/user.actions';
import { MovieListItem } from 'src/app/core/interfaces/movie.interfaces';

export const initiaUserState: {
  user: User | undefined;
} = { user: undefined };

export const userReducer = createReducer(
  initiaUserState,
  on(UserActions.login.userLoginSuccess, (state, payload) => {
    return { ...state, user: payload };
  }),
  on(UserActions.logout.userLogoutComplete, (state) => {
    return { ...state, user: undefined };
  }),
  on(UserActions.retrieve.userRetrieveSuccess, (state, payload) => {
    return { ...state, user: payload };
  }),
  on(UserActions.addMovie.userAddmovieSuccess, (state, payload) => {
    return {
      ...state,
      user: {
        ...(state.user as User),
        movies: [...(state.user?.movies as MovieListItem[]), payload],
      },
    };
  }),
  on(UserActions.removeMovie.userRemovemovieSuccess, (state, payload) => {
    return {
      ...state,
      user: {
        ...(state.user as User),
        movies: (state.user?.movies as MovieListItem[]).filter(
          (m) => m.id != payload.id
        ),
      },
    };
  })
);
