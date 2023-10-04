import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { titleFilter } from '@/utils/query/moviesQuery';
import { genreFilter } from '@/utils/query/moviesQuery';
import { countryFilter } from '@/utils/query/moviesQuery';
import { yearFilter } from '@/utils/query/moviesQuery';

export async function GET(request: Request) {
  try {
    const searchParams = new URLSearchParams(request.url.split('?')[1]);
    const title = searchParams.get('title')!;
    const genre = searchParams.getAll('genre[]').map(Number);
    const country = searchParams.getAll('country[]').map(Number);
    const year_start = searchParams.get('year_start');
    const year_end = searchParams.get('year_end');
    const page = searchParams.get('page')!;

    const filter: any = {
      AND: [],
    };
    filter.AND.push(
      titleFilter(title),
      genreFilter(genre),
      countryFilter(country),
      ...yearFilter(year_start, year_end),
    );

    const count = await db.movie.count({
      where: filter,
    });

    const movies = await db.movie.findMany({
      select: {
        id: true,
        title: true,
      },
      where: filter,
      orderBy: {
        title: 'asc',
      },
      skip: (parseInt(page) - 1) * 18,
      take: 18,
    });

    return NextResponse.json({ count, movies }, { status: 200 });
  } catch (error) {
    throw NextResponse.json(
      { message: 'Непредвиденная ошибка' },
      { status: 500 },
    );
  }
}
