import { createActionGroup, props } from '@ngrx/store';
import { Movie } from '../../interfaces/movie.interfaces';

export const MovieActions = createActionGroup({
  source: 'Movie',
  events: {
    'Movie Search Request': props<{
      title: string;
      selector: 't' | 'i';
    }>(),
    'Movie Search Success': props<Movie>(),
    'Movie Search Error': props<{ error: string }>(),
    //'Movie Search Error': emptyProps,
  },
});
