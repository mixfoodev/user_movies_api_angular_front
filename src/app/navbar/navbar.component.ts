import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { SideMenuActions, UserFormActions } from '../store/actions/app.actions';
import { UserActions } from '../store/actions/user.actions';
import { User } from '../interfaces/user.interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() isMobile = false;
  @Input() isUserFormOpen = false;
  isFormVisible$: Observable<boolean>;
  userSubscription!: Subscription;

  isAuthenticated = false;
  isAdmin = false;

  username = '';
  password = '';

  constructor(
    private store: Store<{ userForm: boolean; userState: { user: User } }>
  ) {
    this.isFormVisible$ = this.store.select('userForm');
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
