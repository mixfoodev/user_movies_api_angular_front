import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserFormActions = createActionGroup({
  source: 'UserForm',
  events: {
    'User Form Toggled': emptyProps(),
    'User Form Hide': emptyProps(),
    'User Form Sending': emptyProps(),
  },
});

export const SideMenuActions = createActionGroup({
  source: 'SideMenu',
  events: {
    'Side Menu Toggled': emptyProps(),
    'Side Menu Hide': emptyProps(),
  },
});

export const ToastActions = createActionGroup({
  source: 'Toast',
  events: {
    'Toast Request': props<{ msg: string; success: boolean }>(),
    'Toast Show': props<{ msg: string; success: boolean }>(),
    'Toast Hide': emptyProps(),
  },
});
