import { createReducer, on } from '@ngrx/store';
import {
  ToastActions,
  SideMenuActions,
  UserFormActions,
} from '../actions/app.actions';
import { UserActions } from '../actions/user.actions';
import { initialFormState, initialToastState } from '../state/app.state';

export const userFormReducer = createReducer(
  initialFormState,
  on(UserFormActions.userFormToggled, (state) => ({
    ...state,
    isVisible: !state.isVisible,
  })),
  on(UserFormActions.userFormHide, (state) => initialFormState),
  on(UserFormActions.userFormSending, (state) => ({
    ...state,
    isSending: true,
  })),
  on(
    UserActions.login.userLoginError,
    UserActions.create.userCreateError,
    (state) => ({
      ...state,
      isSending: false,
    })
  ),
  on(
    UserActions.login.userLoginRequest,
    UserActions.create.userCreateRequest,
    (state, { username, password }) => ({
      ...state,
      username,
      password,
    })
  )
);

export const sidebarMenuReducer = createReducer(
  false,
  on(SideMenuActions.sideMenuToggled, (state) => !state),
  on(SideMenuActions.sideMenuHide, (_) => false)
);

export const toastReducer = createReducer(
  initialToastState,
  on(ToastActions.toastShow, (_, payload) => ({ ...payload, show: true })),
  on(ToastActions.toastHide, (state) => ({ ...state, show: false }))
);
