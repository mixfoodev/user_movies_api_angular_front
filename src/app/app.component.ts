import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SideMenuActions, UserFormActions } from './store/actions/app.actions';
import { User } from './interfaces/user.interfaces';
import { UserActions } from './store/actions/user.actions';
import { ToastState } from './interfaces/app.interfaces';
import { toastToggleAnimation } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [toastToggleAnimation],
})
export class AppComponent implements OnInit, OnDestroy {
  private breakPointSubscription!: Subscription;
  private userFormSubscription!: Subscription;
  private sidebarMenuSubscription!: Subscription;
  private userSubscription!: Subscription;
  private toastSubscription!: Subscription;

  user: User | undefined;
  toast!: ToastState;
  isMobile = false;
  isSideBarOpen = false;
  isUserFormOpen = false;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private store: Store<{
      userForm: boolean;
      sidebarMenu: boolean;
      userState: { user: User };
      toastState: ToastState;
    }>
  ) {}

  ngOnInit(): void {
    this.breakPointSubscription = this.breakpointObserver
      //.observe(['(max-width: 630px), (max-width: 900px)'])
      .observe(['(max-width: 900px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log(state.breakpoints);
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });

    this.userFormSubscription = this.store
      .select('userForm')
      .subscribe((state) => {
        this.isUserFormOpen = state;
      });

    this.sidebarMenuSubscription = this.store
      .select('sidebarMenu')
      .subscribe((state) => {
        this.isSideBarOpen = state;
      });

    this.userSubscription = this.store
      .select('userState')
      .subscribe((state) => {
        this.user = state.user;
      });

    this.toastSubscription = this.store
      .select('toastState')
      .subscribe((toast) => {
        this.toast = toast;
      });

    this.store.dispatch(UserActions.retrieve.userRetrieveRequest());
  }

  hideModals() {
    if (this.isMobile) this.store.dispatch(SideMenuActions.sideMenuHide());
    this.store.dispatch(UserFormActions.userFormHide());
  }

  ngOnDestroy(): void {
    this.userFormSubscription?.unsubscribe();
    this.sidebarMenuSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
    this.breakPointSubscription?.unsubscribe();
    this.toastSubscription?.unsubscribe();
  }
}
