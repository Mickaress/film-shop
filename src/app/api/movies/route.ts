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

    const countResponse = await db.movie.findMany({
      where: filter,
    });

    const count = countResponse.length;

    const movieResponse = await db.movie.findMany({
      where: filter,
      include: {
        genres: {
          select: {
            genre: {
              select: {
                name: true,
              },
            },
          },
        },
        products: true,
        country: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
      skip: (parseInt(page) - 1) * 18,
      take: 18,
    });

    const movies = movieResponse.map((movie) => ({
      id: movie.id,
      title: movie.title,
      year: movie.year,
      country: movie.country.name,
      description: movie.description,
      genres: movie.genres.map((genre) => genre.genre.name),
      products: movie.products,
    }));

    return NextResponse.json({ count, movies }, { status: 200 });
  } catch (error) {
    throw NextResponse.json(
      { message: 'Непредвиденная ошибка' },
      { status: 500 },
    );
  }
}
