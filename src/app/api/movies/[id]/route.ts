import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

type Props = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: Props) {
  try {
    const { id } = params;

    const response = await db.movie.findUnique({
      where: {
        id: parseInt(id),
      },
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
        products: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
          },
        },
        country: {
          select: {
            name: true,
          },
        },
      },
    });
    const movie = {
      id: response?.id,
      title: response?.title,
      year: response?.year,
      country: response?.country.name,
      description: response?.description,
      genres: response?.genres.map((genre) => genre.genre.name),
      products: response?.products,
    };

    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    throw NextResponse.json(
      { message: 'Ошибка получения данных' },
      { status: 500 },
    );
  }
}
