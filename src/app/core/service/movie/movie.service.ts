import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieOmdb } from '../../interfaces/movie.interfaces';
import { environment } from './../../../../environments/environment';

const MOVIE_URL = 'http://www.omdbapi.com/';
const url1 = '../../assets/sample.json';
//const API_KEY = '6af7dc79';
const API_KEY = environment.MOVIES_API_KEY;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  searchMovie(title: string, selector: 't' | 'i') {
    console.log('MovieService searchMovie');

    const url = `${MOVIE_URL}?apikey=${API_KEY}&${selector}=${title}`;
    return this.http.get<MovieOmdb>(url);
  }
}
