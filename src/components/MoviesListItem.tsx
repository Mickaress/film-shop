import Image from 'next/image';
import { FC } from 'react';
import Link from 'next/link';

interface Props {
  id: number;
  title: string;
}

const MoviesListItem: FC<Props> = ({ id, title }) => {
  const poster = require(`@/api/static/moviesPosters/${id}.png`);

  return (
    <Link href={`/movie/${id}`} className="relative">
      <Image
        src={poster}
        alt={title}
        className="w-[150px] h-[230px] rounded-lg border-dark_gray border"
      />
      <div className="absolute top-0 left-0 w-[150px] h-[230px] rounded-lg bg-black/50 opacity-0 hover:opacity-100 cursor-pointer flex items-center">
        <p className="text-white opacity-100 text-xl w-[150px] text-center">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default MoviesListItem;
