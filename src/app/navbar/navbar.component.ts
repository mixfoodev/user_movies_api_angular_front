import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { SideMenuActions, UserFormActions } from '../store/actions/app.actions';
import { UserActions } from '../store/actions/user.actions';
import { User } from '../interfaces/user.interfaces';
import { formOpenCloseAnimation } from './navbar.animations';
import { userFormState } from '../store/reducers/app.reducer';

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

  isAuthenticated = false;
  isAdmin = false;

  username = '';
  password = '';

  constructor(
    private store: Store<{ userForm: userFormState; userState: { user: User } }>
  ) {
    this.formState$ = this.store.select('userForm');
  }
  ngOnInit(): void {
    this.userSubscription = this.store
      .select('userState')
      .subscribe(({ user }) => {
        this.isAuthenticated = user !== undefined;
        this.isAdmin = user?.admin || false;
      });
  }

  toggleUserForm() {
    this.store.dispatch(UserFormActions.userFormToggled());
  }

  toggleSideMenu() {
    this.store.dispatch(SideMenuActions.sideMenuToggled());
  }

  userFormSubmit() {
    if (!this.username || !this.password) return;

    this.store.dispatch(UserFormActions.userFormSending());

    if (!this.isAuthenticated)
      this.store.dispatch(
        UserActions.login.userLoginRequest({
          username: this.username,
          password: this.password,
        })
      );
    else if (this.isAdmin)
      this.store.dispatch(
        UserActions.create.userCreateRequest({
          username: this.username,
          password: this.password,
        })
      );
  }

  handleLogout() {
    this.store.dispatch(UserActions.logout.userLogoutRequest());
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
