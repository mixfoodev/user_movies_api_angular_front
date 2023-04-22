import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../interfaces/movie.interfaces';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/user.interfaces';
import { UserActions } from '../store/actions/user.actions';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit, OnDestroy {
  movie$!: Observable<Movie>;
  user$!: Observable<User>;
  //isFavorite$!: Observable<boolean>;
  isFavorite = false;
  user!: User;

  isFavoriteSubscription!: Subscription;
  userSubscription!: Subscription;

  constructor(
    private store: Store<{
      movieState: { movie: Movie };
      userState: { user: User };
    }>
  ) {}

  ngOnInit(): void {
    this.movie$ = this.store
      .select('movieState')
      .pipe(map((movieState) => movieState.movie));

    this.user$ = this.store
      .select('userState')
      .pipe(map((userState) => userState.user));

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
