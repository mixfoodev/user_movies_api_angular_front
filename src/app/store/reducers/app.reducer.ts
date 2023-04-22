import { createReducer, on } from '@ngrx/store';
import {
  ToastActions,
  SideMenuActions,
  UserFormActions,
  errorOccurred,
} from '../actions/app.actions';
import { ToastState } from 'src/app/interfaces/app.interfaces';

export const userFormReducer = createReducer(
  false,
  on(UserFormActions.userFormToggled, (state) => !state),
  on(UserFormActions.userFormHide, (state) => false)
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
  on(ToastActions.toastShow, (_, payload) => {
    return { ...payload, show: true };
  }),
  on(ToastActions.toastHide, () => {
    return toastState;
  })
);
