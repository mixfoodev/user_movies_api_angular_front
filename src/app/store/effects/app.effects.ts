import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, delay, filter } from 'rxjs/operators';
import { ToastActions, UserFormActions } from '../actions/app.actions';
import { UserActions } from '../actions/user.actions';
import { EMPTY, of } from 'rxjs';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions) {}
  // todo kanw to tost na pairnei msg[] kai se kathe hide na kanw shift to prwto msg
  // kai kala gia na min mperdeyontai se periptwsi apanwtwn toasts
  showToast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToastActions.toastRequest),
      map((actions) =>
        ToastActions.toastShow({
          msg: actions.msg,
          success: actions.success,
        })
      )
    )
  );

  hideToast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToastActions.toastShow),
      delay(2000),
      map(() => ToastActions.toastHide())
    )
  );

  hideForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserActions.login.userLoginSuccess,
        UserActions.create.userCreateSuccess
      ),
      map(() => UserFormActions.userFormHide())
    )
  );

  userFormErrorShowInactiveToast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserFormActions.userFormSendError),
      filter((error) => error.status === 401),
      map(() => {
        return UserActions.retrieve.userInactive();
      })
    )
  );
}
