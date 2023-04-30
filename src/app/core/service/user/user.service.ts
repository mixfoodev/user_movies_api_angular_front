import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieListItem } from 'src/app/core/interfaces/movie.interfaces';
import { User } from 'src/app/core/interfaces/user.interfaces';

//const BASE_URL = 'http://localhost:8080/api/';
const BASE_URL = '/api/';
const CREATE_USER_URL = BASE_URL + 'users';
const LOGIN_USER_URL = BASE_URL + 'auth/login';
const LOGOUT_USER_URL = BASE_URL + 'auth/logout';
const RETRIEVE_USER_URL = BASE_URL + 'auth';
const REFRESH_USER_SESSION_URL = BASE_URL + 'auth/refresh';
const USER_URL = BASE_URL + 'users';

const sample = '../../assets/user.json';
const sample1 = '../../assets/admin.json';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(username: string, password: string) {
    return this.http.post<User>(CREATE_USER_URL, { username, password });
    //return this.http.get<User>(sample1);
  }

  loginUser(username: string, password: string) {
    return this.http.post<User>(LOGIN_USER_URL, { username, password });
    //return this.http.get<User>(sample1);
  }

  logoutUser() {
    return this.http.get<User>(LOGOUT_USER_URL);
  }

  getUserSession() {
    return this.http.get<User>(RETRIEVE_USER_URL);
  }

  refreshUserSession() {
    return this.http.get<User>(REFRESH_USER_SESSION_URL);
  }

  addMovieToUser(userId: number, movie: MovieListItem) {
    const url = `${USER_URL}/${userId}/movies`;
    return this.http.post<MovieListItem>(url, movie);
    //return this.http.get<User>(sample1);
  }

  removeMovieFromUser(userId: number, movieId: string) {
    const url = `${USER_URL}/${userId}/movies/${movieId}`;
    return this.http.delete<Movie>(url);
    //return this.http.get<User>(sample1);
  }
}
