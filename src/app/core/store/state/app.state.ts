import { User, userFormState } from 'src/app/core/interfaces/user.interfaces';
import { Movie } from '../../interfaces/movie.interfaces';
import { ToastState } from '../../interfaces/app.interfaces';

export const initialMovieState: {
  movie: Movie | undefined;
  isSearching: boolean;
  fetchingMovieId: string;
} = { movie: undefined, isSearching: false, fetchingMovieId: '' };

export const initiaUserState: {
  user: User | undefined;
} = { user: undefined };

export const initialFormState: userFormState = {
  isVisible: false,
  isSending: false,
};

export const initialToastState: ToastState = {
  msg: '',
  success: true,
  show: false,
};
