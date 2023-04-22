import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movie, MovieListItem } from 'src/app/interfaces/movie.interfaces';
import { User } from 'src/app/interfaces/user.interfaces';

type UserFormType = {
  username: string;
  password: string;
};

const UserLoginActions = createActionGroup({
  source: 'User Login',
  events: {
    'User Login Request': props<UserFormType>(),
    'User Login Success': props<User>(),
    'User Login Error': emptyProps,
  },
});

const UserLogoutActions = createActionGroup({
  source: 'User Logout',
  events: {
    'User Logout Request': emptyProps,
    'User Logout Success': emptyProps,
    'User Logout Error': emptyProps,
  },
});

const UserCreateActions = createActionGroup({
  source: 'User Create',
  events: {
    'User Create Request': props<UserFormType>(),
    'User Create Success': emptyProps,
    'User Create Error': emptyProps,
  },
});

const UserRetrieveActions = createActionGroup({
  source: 'User Retrieve',
  events: {
    'User Inactive': emptyProps,
    'User Retrieve Request': emptyProps,
    'User Retrieve Success': props<User>(),
    'User Retrieve Error': emptyProps,
  },
});

const UserAddMovieActions = createActionGroup({
  source: 'User AddMovie',
  events: {
    'User AddMovie Request': props<{ userId: number; movie: Movie }>(),
    'User AddMovie Success': props<MovieListItem>(),
    'User AddMovie Error': emptyProps,
  },
});

const UserRemoveMovieActions = createActionGroup({
  source: 'User RemoveMovie',
  events: {
    'User RemoveMovie Request': props<{ userId: number; movieId: string }>(),
    'User RemoveMovie Success': props<MovieListItem>(),
    'User RemoveMovie Error': emptyProps,
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
