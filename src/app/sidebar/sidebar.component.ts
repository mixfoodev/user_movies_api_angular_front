import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  SideMenuActions,
  UserFormActions,
} from '../core/store/actions/app.actions';
import { Observable, map } from 'rxjs';
import { User } from '../core/interfaces/user.interfaces';
import { MovieListItem } from '../core/interfaces/movie.interfaces';
import { UserActions } from '../core/store/actions/user.actions';
import { MovieActions } from '../core/store/actions/movie.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() isMobile = false;
  @Input() user: User | undefined;
  fetchingMovieId$!: Observable<string>;

  constructor(
    private store: Store<{
      userForm: boolean;
      sidebarMenu: boolean;
      userState: User;
      movieState: { fetchingMovieId: string };
    }>
  ) {}

  ngOnInit(): void {
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
}
