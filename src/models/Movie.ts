export type MovieType = {
  id: number;
  title: string;
};

export type MoviesListType = {
  count: number;
  movies: MovieType[];
};

export type MovieDetailType = MovieType & {
  year: number;
  country: string;
  genres: string[];
  description: string;
  products: MovieProductType[];
};

export type MovieProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  isInCart: boolean;
};

export type MovieStaticticsType = {
  name: string;
  amount: number;
};

export type MovieGenreType = {
  id: number;
  name: string;
};

export type MovieCountryType = {
  id: number;
  name: string;
};

export type FilterType = {
  title: string;
  genre: string[];
  country: string[];
  year_start: string | null;
  year_end: string | null;
  page: string;
};
