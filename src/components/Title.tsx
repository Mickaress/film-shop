'use client';

import { useGetOnedMovieQuery } from '@/api/moviesApi/hooks/useGetOneFilmQuery';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

type Props = {
  id: number;
};

const Title: React.FC<Props> = ({ id }) => {
  const { data, isLoading } = useGetOnedMovieQuery(id);

  if (isLoading) {
    return (
      <div className="my-5 w-full">
        <Skeleton height={48} />
      </div>
    );
  }

  return <h1 className="bold text-[48px] my-5">{data?.title}</h1>;
};

export default Title;
