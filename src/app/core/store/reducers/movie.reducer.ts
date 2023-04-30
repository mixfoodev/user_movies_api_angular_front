import { createReducer, on } from '@ngrx/store';
import { MovieActions } from '../actions/movie.actions';
import { initialMovieState } from '../state/app.state';

export const movieReducer = createReducer(
  initialMovieState,
  on(MovieActions.movieSearchRequest, (state) => {
    return { ...state, isSearching: true };
  }),
  on(MovieActions.movieSearchFavoriteRequest, (state, payload) => {
    return { ...state, fetchingMovieId: payload.title };
  }),

  on(MovieActions.movieSearchSuccess, (_, payload) => {
    console.log('MovieActions.movieSearchSuccess');
    console.log('payload', payload);
    return { movie: payload, isSearching: false, fetchingMovieId: '' };
  }),
  on(MovieActions.movieSearchError, (state) => {
    return { ...state, isSearching: false, fetchingMovieId: '' };
  })
);
