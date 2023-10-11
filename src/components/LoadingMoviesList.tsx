import React from 'react';
import Skeleton from 'react-loading-skeleton';

type LoadingMoviesListProps = {
  length: number;
};

const LoadingMoviesList: React.FC<LoadingMoviesListProps> = ({ length }) => {
  const LoadingMoviesList = [];
  for (let i = 0; i < length; i++) {
    LoadingMoviesList.push(<Skeleton width={150} height={230} key={i} />);
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {LoadingMoviesList}
    </div>
  );
};

export default LoadingMoviesList;
