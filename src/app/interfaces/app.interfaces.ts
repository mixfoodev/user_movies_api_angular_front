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
