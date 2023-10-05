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

    const response = await db.product.findMany({
      where: {
        movieId: parseInt(id),
      },
      select: {
        name: true,
        description: true,
        price: true,
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    throw NextResponse.json(
      { message: 'Ошибка получения данных' },
      { status: 500 },
    );
  }
}
