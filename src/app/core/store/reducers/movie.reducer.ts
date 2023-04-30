import { createReducer, on } from '@ngrx/store';
import { Movie } from '../../interfaces/movie.interfaces';
import { MovieActions } from '../actions/movie.actions';

export const initialMovieState: {
  movie: Movie | undefined;
  isSearching: boolean;
  fetchingMovieId: string;
} = { movie: undefined, isSearching: false, fetchingMovieId: '' };

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
  // on(MovieActions.movieSearchError, (state, payload) => {
  //   console.log('MovieActions.movieSearchError');
  //   console.log(payload);
  //   return { ...state, error: payload.error };
  // })
);
