import { Movie } from './movie.interfaces';

export interface StoreState {
  userForm: boolean;
  sidebarMenu: boolean;
  movie: Movie;
}

export interface ToastState {
  msg: string;
  success: boolean;
  show: boolean;
}

export type ErrorResponse = {
  status: number;
  error?: {
    error: string;
  };
};
