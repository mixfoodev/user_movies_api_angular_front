import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  SideMenuActions,
  UserFormActions,
} from '../core/store/actions/app.actions';
import { Subscription, Observable, map } from 'rxjs';
import { User } from '../core/interfaces/user.interfaces';
import { MovieListItem } from '../core/interfaces/movie.interfaces';
import { UserActions } from '../core/store/actions/user.actions';
import { MovieActions } from '../core/store/actions/movie.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() isMobile = false;
  fetchingMovieId$!: Observable<string>;
  userSubscription!: Subscription;
  movies: MovieListItem[] = [];
  isAuthenticated = false; // ->
  isAdmin = false; // todo na ta parw ayta ap to appcomponent?

  constructor(
    private store: Store<{
      userForm: boolean;
      sidebarMenu: boolean;
      userState: { user: User };
      movieState: { fetchingMovieId: string };
    }>
  ) {}
  ngOnInit(): void {
    this.userSubscription = this.store
      .select('userState')
      .subscribe(({ user }) => {
        this.isAuthenticated = user !== undefined;
        this.isAdmin = user?.admin || false;
        this.movies = user?.movies ?? [];
      });

    this.fetchingMovieId$ = this.store
      .select('movieState')
      .pipe(map((state) => state.fetchingMovieId));
  }

  openUserForm() {
    this.hideSidebar();
    this.store.dispatch(UserFormActions.userFormToggled());
  }

  hideSidebar() {
    this.store.dispatch(SideMenuActions.sideMenuHide());
  }

  handleMovieClick(movie: MovieListItem) {
    this.store.dispatch(
      MovieActions.movieSearchFavoriteRequest({
        title: movie.id,
        selector: 'i',
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
