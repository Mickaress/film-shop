import MovieInfo from '@/components/MovieInfo';
import React from 'react';
import { FC } from 'react';

interface Props {
  params: {
    id: string;
  };
}

const page: FC<Props> = ({ params: { id } }) => {
  const filmId = parseInt(id);
  return <MovieInfo id={filmId} />;
};

export default page;
