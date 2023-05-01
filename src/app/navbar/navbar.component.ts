import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import {
  SideMenuActions,
  UserFormActions,
} from '../core/store/actions/app.actions';
import { UserActions } from '../core/store/actions/user.actions';
import { User, userFormState } from '../core/interfaces/user.interfaces';
import { formOpenCloseAnimation } from './navbar.animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [formOpenCloseAnimation],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() isMobile = false;
  @Input() isUserFormOpen = false; //todo na to tsekarw kai an einai na to svisw
  formState$: Observable<userFormState>;
  userSubscription!: Subscription;
  formFieldsSubscription!: Subscription;

  isAuthenticated = false;
  isAdmin = false;

  username = '';
  password = '';

  constructor(
    private store: Store<{ userForm: userFormState; userState: User }>
  ) {
    this.formState$ = this.store.select('userForm');
  }
  ngOnInit(): void {
    this.userSubscription = this.store.select('userState').subscribe((user) => {
      this.isAuthenticated = user !== undefined;
      this.isAdmin = user?.admin || false;
    });

    this.formFieldsSubscription = this.formState$.subscribe((state) => {
      this.username = state.username;
      this.password = state.password;
    });
  }

  toggleUserForm() {
    this.store.dispatch(UserFormActions.userFormToggled());
  }

  toggleSideMenu() {
    this.store.dispatch(SideMenuActions.sideMenuToggled());
  }

  userFormSubmit() {
    const usernameValue = this.username;
    const passwordValue = this.password;
    if (!usernameValue || !passwordValue) return;

    this.store.dispatch(UserFormActions.userFormSending());

    if (!this.isAuthenticated)
      this.store.dispatch(
        UserActions.login.userLoginRequest({
          username: usernameValue,
          password: passwordValue,
        })
      );
    else if (this.isAdmin)
      this.store.dispatch(
        UserActions.create.userCreateRequest({
          username: usernameValue,
          password: passwordValue,
        })
      );
  }

  handleLogout() {
    this.store.dispatch(UserActions.logout.userLogoutRequest());
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.formFieldsSubscription?.unsubscribe();
  }
}
