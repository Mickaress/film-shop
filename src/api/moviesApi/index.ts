import { FilterType } from '@/models/Movie';
import axios from 'axios';

export const getFilteredFilms = async (filter: FilterType) => {
  try {
    const response = await axios.get('api/movies', { params: filter });
    return response.data;
  } catch (error) {
    throw 'Непредвиденная ошибка';
  }
};

export const getOneMovie = async (movieId: number) => {
  try {
    const response = await axios.get(`/api/movies/${movieId}`);
    return response.data;
  } catch (error) {
    throw 'Непредвиденная ошибка';
  }
};

export const getMovieStatictics = async (
  movieId: number,
  startDate: string,
  endDate: string,
) => {
  try {
    const response = await axios.get(`/api/movies/${movieId}/statistics`, {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });
    return response.data;
  } catch (error) {
    throw 'Непредвиденная ошибка';
  }
};

export const getAllGenres = async () => {
  try {
    const response = await axios.get('api/movies/genres');
    return response.data;
  } catch (error) {
    throw 'Непредвиденная ошибка';
  }
};

export const getAllCountries = async () => {
  try {
    const response = await axios.get('api/movies/countries');
    return response.data;
  } catch (error) {
    throw 'Непредвиденная ошибка';
  }
};

export const getMovieProducts = async (movieId: number) => {
  try {
    const response = await axios.get(`/api/movies/${movieId}/products`);
    return response.data;
  } catch (error) {
    throw 'Непредвиденная ошибка';
  }
};
