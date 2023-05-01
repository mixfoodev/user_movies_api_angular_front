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
  username: string;
  password: string;
}

export type UserFormType = {
  username: string;
  password: string;
};
