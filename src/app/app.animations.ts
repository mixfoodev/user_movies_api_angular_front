import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const toastToggleAnimation = trigger('toggleToast', [
  state(
    'show',
    style({
      opacity: 1,
    })
  ),
  state(
    'hide',
    style({
      opacity: 0,
      display: 'none',
    })
  ),
  transition('show => hide, hide => show', [
    style({ display: 'block' }),
    animate('.3s'),
  ]),
]);

export const sidebarToggleAnimation = trigger('toggleSidebar', [
  state(
    'show',
    style({
      opacity: 1,
    })
  ),
  state(
    'hide',
    style({
      opacity: 0,
      width: '0px',
      display: 'none',
    })
  ),
  state(
    'silent',
    style({
      opacity: 0,
      width: '0px',
      display: 'none',
    })
  ),
  transition('show => hide, hide => show, silent => show', [
    style({ display: 'block' }),
    animate('.1s'),
  ]),
]);
