'use client';
import { useSetQueryParams } from '@/hooks/useSetQueryParams';
import { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  pages: number;
  currentPage: number;
}

const Pagination: FC<Props> = ({ pages, currentPage }) => {
  const setQueryParams = useSetQueryParams();
  const pagination = [];
  for (let i = 1; i <= pages; i++) {
    pagination.push(
      <button
        className={`${
          i === currentPage && 'bg-blue/50'
        } rounded-[50%] w-9 h-9 flex items-center justify-center`}
        key={i}
        onClick={() => handlePageChange(i)}
        disabled={i === currentPage}
      >
        <p className="text-sm">{i}</p>
      </button>,
    );
  }

  const handlePageChange = (page: number) => {
    if (page !== 0 && page <= pages) {
      setQueryParams({ page: page.toString() });
    }
  };

  if (pages < 2) return;

  return (
    <div className="flex gap-8 items-center mt-5">
      <ChevronLeft
        className="cursor-pointer"
        onClick={() => handlePageChange(currentPage - 1)}
      />
      <div className="flex">{pagination}</div>
      <ChevronRight
        className="cursor-pointer"
        onClick={() => handlePageChange(currentPage + 1)}
      />
    </div>
  );
};

export default Pagination;
