import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  SideMenuActions,
  UserFormActions,
} from './core/store/actions/app.actions';
import { UserActions } from './core/store/actions/user.actions';
import { User } from './core/interfaces/user.interfaces';
import { ToastState } from './core/interfaces/app.interfaces';
import { sidebarToggleAnimation, toastToggleAnimation } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [toastToggleAnimation, sidebarToggleAnimation],
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
  sidebarState = !this.isMobile || this.isSideBarOpen ? 'show' : 'hide';

  // todo implement ngrx selectors
  constructor(
    public breakpointObserver: BreakpointObserver,
    private store: Store<{
      userForm: boolean;
      sidebarMenu: boolean;
      userState: User | undefined;
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
          if (!this.isSideBarOpen) this.sidebarState = 'silent';
          this.isMobile = true;
        } else {
          this.isMobile = false;
          this.sidebarState = 'show';
        }
      });

    this.sidebarMenuSubscription = this.store
      .select('sidebarMenu')
      .subscribe((state) => {
        this.isSideBarOpen = state;
        this.sidebarState =
          !this.isMobile || this.isSideBarOpen ? 'show' : 'hide';
      });

    this.userSubscription = this.store
      .select('userState')
      .subscribe((state) => {
        this.user = state;
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
