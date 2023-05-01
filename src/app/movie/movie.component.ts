import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../core/interfaces/movie.interfaces';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../core/interfaces/user.interfaces';
import { UserActions } from '../core/store/actions/user.actions';
import { ToastActions } from '../core/store/actions/app.actions';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit, OnDestroy {
  movie$!: Observable<Movie>;
  user$!: Observable<User>;
  user!: User;

  isFavorite = false;

  isFavoriteSubscription!: Subscription;
  userSubscription!: Subscription;

  constructor(
    private store: Store<{
      movieState: { movie: Movie; isSearching: boolean };
      userState: User;
    }>
  ) {}

  ngOnInit(): void {
    this.movie$ = this.store
      .select('movieState')
      .pipe(map((movieState) => movieState.movie));

    this.user$ = this.store.select('userState').pipe(map((user) => user));

    this.isFavoriteSubscription = combineLatest([this.movie$, this.user$])
      .pipe(
        map(
          ([movie, user]) =>
            (user?.movies || false) &&
            user?.movies.map((m) => m.id).includes(movie?.id)
        )
      )
      .subscribe((val) => (this.isFavorite = val));

    this.userSubscription = this.user$.subscribe((u) => (this.user = u));
  }

  toggleFavorite(movie: Movie) {
    if (!this.user) {
      this.store.dispatch(
        ToastActions.toastRequest({
          msg: 'You have to log in for this action!',
          success: false,
        })
      );
    }

    if (this.isFavorite) {
      this.store.dispatch(
        UserActions.removeMovie.userRemovemovieRequest({
          userId: this.user?.id,
          movieId: movie?.id,
        })
      );
    } else {
      this.store.dispatch(
        UserActions.addMovie.userAddmovieRequest({
          userId: this.user?.id,
          movie,
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.isFavoriteSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }
}
