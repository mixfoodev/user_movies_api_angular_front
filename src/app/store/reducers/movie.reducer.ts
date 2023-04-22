import { createReducer, on } from '@ngrx/store';
import { Movie } from '../../interfaces/movie.interfaces';
import { MovieActions } from '../actions/movie.actions';

export const initialMovieState: {
  movie: Movie | undefined;
} = { movie: undefined };

export const movieReducer = createReducer(
  initialMovieState,
  on(MovieActions.movieSearchSuccess, (state, payload) => {
    console.log('MovieActions.movieSearchSuccess');
    console.log('payload', payload);

    return { ...state, movie: payload };
  })
  // on(MovieActions.movieSearchError, (state, payload) => {
  //   console.log('MovieActions.movieSearchError');
  //   console.log(payload);
  //   return { ...state, error: payload.error };
  // })
);
