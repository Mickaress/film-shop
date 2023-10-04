import axios from 'axios';

export const getAllGenres = async () => {
  try {
    const response = await axios.post('api/movies/genres');
    return response.data;
  } catch (error) {
    throw 'Непредвиденная ошибка';
  }
};
