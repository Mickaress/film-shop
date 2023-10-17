'use client';
import { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './ui/Button';

type Props = {
  pages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
};

const Pagination: FC<Props> = ({ pages, currentPage, handlePageChange }) => {
  const pagination = [];
  for (let i = 1; i <= pages; i++) {
    pagination.push(
      <Button
        key={i}
        variant="text"
        className={`${
          i === currentPage && 'bg-blue/50'
        } rounded-full w-9 h-9 text-darkgray hover:no-underline hover:bg-blue/50`}
        disabled={i === currentPage}
      >
        {i}
      </Button>,
    );
  }

  if (pages < 2) return;

  return (
    <div className="flex gap-8 items-center mt-5">
      <Button
        variant="text"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft
          className={`${
            currentPage === 1 ? 'stroke-gray' : 'hover:stroke-blue'
          }`}
        />
      </Button>
      <div className="flex">{pagination}</div>
      <Button
        variant="text"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pages}
      >
        <ChevronRight
          className={`${
            currentPage === pages ? 'stroke-gray' : 'hover:stroke-blue'
          }`}
        />
      </Button>
    </div>
  );
};

export default Pagination;
