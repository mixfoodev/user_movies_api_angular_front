import { createReducer, on } from '@ngrx/store';
import {
  ToastActions,
  SideMenuActions,
  UserFormActions,
} from '../actions/app.actions';
import { ToastState } from 'src/app/core/interfaces/app.interfaces';
import { UserActions } from '../actions/user.actions';

export interface userFormState {
  isVisible: boolean;
  isSending: boolean;
}

const initialFormState: userFormState = {
  isVisible: false,
  isSending: false,
};

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
  )
);

export const sidebarMenuReducer = createReducer(
  false,
  on(SideMenuActions.sideMenuToggled, (state) => !state),
  on(SideMenuActions.sideMenuHide, (state) => false)
);

const toastState: ToastState = {
  msg: '',
  success: true,
  show: false,
};

export const toastReducer = createReducer(
  toastState,
  on(ToastActions.toastShow, (_, payload) => ({ ...payload, show: true })),
  on(ToastActions.toastHide, (state) => ({ ...state, show: false }))
);
