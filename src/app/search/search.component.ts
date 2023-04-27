import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MovieActions } from '../store/actions/movie.actions';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchValue = '';
  isSearching$!: Observable<boolean>;
  constructor(private store: Store<{ movieState: { isSearching: boolean } }>) {}

  ngOnInit(): void {
    this.isSearching$ = this.store
      .select('movieState')
      .pipe(
        map((movieState: { isSearching: boolean }) => movieState.isSearching)
      );
  }

  handleSearch() {
    if (this.searchValue === '') return;

    this.store.dispatch(
      MovieActions.movieSearchRequest({
        title: this.searchValue,
        selector: 't',
      })
    );

    this.searchValue = '';
  }
}
