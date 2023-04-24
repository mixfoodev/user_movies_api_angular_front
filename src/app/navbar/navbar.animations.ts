import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const formOpenCloseAnimation = trigger('openClose', [
  state(
    'open',
    style({
      overflow: 'hidden',
      opacity: 1,
      display: 'flex',
    })
  ),
  state(
    'closed',
    style({
      opacity: 0,
      width: '0px',
      height: '0px',
      padding: 0,
      overflow: 'hidden',
      display: 'none',
    })
  ),
  transition('open => closed, closed => open', [
    style({ display: 'flex' }),
    animate('.3s'),
  ]),
]);
