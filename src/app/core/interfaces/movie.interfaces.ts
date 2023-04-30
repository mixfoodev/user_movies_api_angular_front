export interface MovieOmdb {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  imdbRating: string;
  Plot: string;
  Director: string;
  Actors: string;
  Production: string;
  BoxOffice: string;
  Language: string;
  Rated: string;
  Error: string;
}

export interface Movie {
  id: string;
  poster: string;
  title: string;
  year: string;
  duration: string;
  genre: string;
  imdbRating: string;
  plot: string;
  director: string;
  actors: string;
  production: string;
  boxOffice: string;
  language: string;
  rated: string;
}

export interface MovieListItem {
  id: string;
  poster: string;
  title: string;
  year: string;
}
