'use client';

import { useGetOnedMovieQuery } from '@/api/moviesApi/hooks/useGetOneFilmQuery';
import Image from 'next/image';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { ClipLoader } from 'react-spinners';

interface Props {
  id: number;
}

const MovieInfo: React.FC<Props> = ({ id }) => {
  const { data, isLoading } = useGetOnedMovieQuery(id);
  const poster = require(`@/api/static/moviesPosters/${id}.png`);

  return (
    <div className="p-5 w-full flex gap-5">
      {isLoading ? (
        <Skeleton width={350} height={400} />
      ) : (
        <Image
          src={poster}
          alt="Постер"
          className="max-w-[350px]  max-h-[500px] rounded-xl"
        />
      )}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5">
          <div className="flex flex-col gap-5 font-bold">
            <h1>Год</h1>
            <h1>Страна</h1>
            <h1>Жанр</h1>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <p>{data?.year || <Skeleton />}</p>
            <p>{data?.country || <Skeleton />}</p>
            <p>{data?.genres.join(', ') || <Skeleton />}</p>
          </div>
        </div>
        <div className="w-full">
          <h1 className="font-bold">Описание</h1>
          <p className="leading-7 w-full">
            {data?.description || <Skeleton count={3} />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
