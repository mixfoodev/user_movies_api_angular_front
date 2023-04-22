import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

export const UserFormActions = createActionGroup({
  source: 'UserForm',
  events: {
    'User Form Toggled': emptyProps(),
    'User Form Hide': emptyProps(),
  },
});

export const SideMenuActions = createActionGroup({
  source: 'SideMenu',
  events: {
    'Side Menu Toggled': emptyProps(),
    'Side Menu Hide': emptyProps(),
  },
});

export const logoutAction = createAction('[LOGOUT]', () => emptyProps());

export const errorOccurred = createAction('[ERROR]', () =>
  props<{ error: string }>()
);

export const ToastActions = createActionGroup({
  source: 'Toast',
  events: {
    'Toast Request': props<{ msg: string; success: boolean }>(),
    'Toast Show': props<{ msg: string; success: boolean }>(),
    'Toast Hide': emptyProps(),
  },
});
