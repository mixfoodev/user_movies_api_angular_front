import {
  Movie,
  MovieListItem,
  MovieOmdb,
} from '../../core/interfaces/movie.interfaces';

export function omdbToMovie(omdb: MovieOmdb): Movie {
  return {
    id: omdb.imdbID,
    poster: omdb.Poster,
    title: omdb.Title,
    year: omdb.Year,
    duration: omdb.Runtime,
    genre: omdb.Genre,
    imdbRating: omdb.imdbRating,
    plot: omdb.Plot,
    director: omdb.Director,
    actors: omdb.Actors,
    production: omdb.Production,
    boxOffice: omdb.BoxOffice,
    language: omdb.Language,
    rated: omdb.Rated,
  };
}

export function toMovieListItem(movie: Movie): MovieListItem {
  return {
    id: movie.id,
    poster: movie.poster,
    title: movie.title,
    year: movie.year,
  };
}
