import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movie, MovieListItem } from 'src/app/core/interfaces/movie.interfaces';
import { User, UserFormType } from 'src/app/core/interfaces/user.interfaces';
import { ErrorResponse } from '../../interfaces/app.interfaces';

const UserLoginActions = createActionGroup({
  source: 'User Login',
  events: {
    'User Login Request': props<UserFormType>(),
    'User Login Success': props<User>(),
    'User Login Error': props<ErrorResponse>(),
  },
});

const UserLogoutActions = createActionGroup({
  source: 'User Logout',
  events: {
    'User Logout Request': emptyProps,
    'User Logout Complete': emptyProps,
  },
});

const UserCreateActions = createActionGroup({
  source: 'User Create',
  events: {
    'User Create Request': props<UserFormType>(),
    'User Create Success': emptyProps,
    'User Create Error': props<ErrorResponse>(),
  },
});

const UserRetrieveActions = createActionGroup({
  source: 'User Retrieve',
  events: {
    'User Inactive': emptyProps,
    'User Retrieve Request': emptyProps,
    'User Retrieve Success': props<User>(),
    'User Retrieve Error': props<ErrorResponse>(),
  },
});

const UserAddMovieActions = createActionGroup({
  source: 'User AddMovie',
  events: {
    'User AddMovie Request': props<{ userId: number; movie: Movie }>(),
    'User AddMovie Success': props<MovieListItem>(),
    'User AddMovie Error': props<ErrorResponse>(),
  },
});

const UserRemoveMovieActions = createActionGroup({
  source: 'User RemoveMovie',
  events: {
    'User RemoveMovie Request': props<{ userId: number; movieId: string }>(),
    'User RemoveMovie Success': props<MovieListItem>(),
    'User RemoveMovie Error': props<ErrorResponse>(),
  },
});

export const UserActions = {
  login: UserLoginActions,
  logout: UserLogoutActions,
  create: UserCreateActions,
  retrieve: UserRetrieveActions,
  addMovie: UserAddMovieActions,
  removeMovie: UserRemoveMovieActions,
};
