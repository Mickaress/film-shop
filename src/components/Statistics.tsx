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
import Checkbox from './ui/Checkbox';

type Props = {
  filmId: number;
};

const Statistics: React.FC<Props> = ({ filmId }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<String[]>([]);

  const { data, isFetching } = useGetMovieStatiscticsQuery(
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

  const options = {
    scales: {
      y: {
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const types = data?.map((type) => type.name);

  const statisctics =
    selectedTypes.length === 0
      ? data
      : data?.filter((element) => selectedTypes.includes(element.name));

  const labels = statisctics?.map((type) => type.name);
  const amounts = statisctics?.map((type) => type.amount);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Количество продаж',
        data: amounts,
        backgroundColor: '#3D68ED',
      },
    ],
  };

  const changeFilter = (type: string) => {
    const newSelectedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((element) => element !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newSelectedTypes);
  };

  return (
    <div className="flex ">
      <div>
        <h1 className="text-base bold font-bold">Фильтр</h1>
        {types?.map((type, index) => (
          <Checkbox
            key={index}
            name={type}
            onChange={() => changeFilter(type)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-5 justify-center items-center w-full max-h-80 mt-5">
        <div className="flex gap-5">
          <input
            type="date"
            onChange={(event) => setStartDate(event.target.value)}
          />
          <span>-</span>
          <input
            type="date"
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>
        {isFetching && <Skeleton height={400} width={800} />}
        {!isFetching &&
          (statisctics && statisctics.length > 0 ? (
            <Bar className="w-full" data={chartData} options={options} />
          ) : (
            <p className="text-[40px]">Нет данных за этот период</p>
          ))}
      </div>
    </div>
  );
};

export default Statistics;
