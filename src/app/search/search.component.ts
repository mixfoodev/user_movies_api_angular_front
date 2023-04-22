import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MovieActions } from '../store/actions/movie.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchValue = '';

  constructor(private store: Store) {}

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
