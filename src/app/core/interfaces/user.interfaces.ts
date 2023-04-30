import { Movie, MovieListItem } from './movie.interfaces';

export interface User {
  id: number;
  username: string;
  movies: MovieListItem[];
  admin: boolean;
}

export interface userFormState {
  isVisible: boolean;
  isSending: boolean;
}