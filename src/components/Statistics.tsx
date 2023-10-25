'use client';

import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useGetMovieStatiscticsQuery } from '@/api/moviesApi/hooks/useGetMovieStatiscticsQuery';
import Skeleton from 'react-loading-skeleton';

type Props = {
  filmId: number;
};

const Statistics: React.FC<Props> = ({ filmId }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data: statisctics, isFetching } = useGetMovieStatiscticsQuery(
    filmId,
    startDate,
    endDate,
  );
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const labels = statisctics?.map((type) => type.name);
  const amounts = statisctics?.map((type) => type.amount);

  const data = {
    labels,
    datasets: [
      {
        label: 'Количество продаж',
        data: amounts,
        backgroundColor: '#3D68ED',
      },
    ],
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center max-h-80 mt-5">
      <div className="flex gap-5">
        <input
          type="date"
          name=""
          onChange={(event) => setStartDate(event.target.value)}
        />
        <span>-</span>
        <input
          type="date"
          name=""
          onChange={(event) => setEndDate(event.target.value)}
        />
      </div>
      {isFetching && <Skeleton height={400} width={800} />}
      {!isFetching &&
        (statisctics && statisctics.length > 0 ? (
          <Bar data={data} />
        ) : (
          <p className="text-[40px]">Нет данных за этот период</p>
        ))}
    </div>
  );
};

export default Statistics;
