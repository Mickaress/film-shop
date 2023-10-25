import Statistics from '@/components/Statistics';
import React from 'react';
import { FC } from 'react';

type Props = {
  params: {
    id: string;
  };
};

const page: FC<Props> = ({ params: { id } }) => {
  const filmId = parseInt(id);

  return <Statistics filmId={filmId} />;
};

export default page;
