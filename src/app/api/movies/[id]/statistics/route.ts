import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = params;

    const selectedMovieId = parseInt(id);
    const url = new URL(request.url);
    const startDateParam = url.searchParams.get('startDate');
    const endDateParam = url.searchParams.get('endDate');
    const startDate = startDateParam ? new Date(startDateParam) : null;
    const endDate = endDateParam ? new Date(endDateParam) : null;

    const typeList = await db.type.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    const dateFilter: any = {};
    if (startDate !== null) {
      dateFilter.gte = startDate;
    }
    if (endDate !== null) {
      dateFilter.lte = endDate;
    }

    const result = await Promise.all(
      typeList.map(async (type) => {
        const products = await db.orderProduct.findMany({
          where: {
            product: {
              movieId: selectedMovieId,
              typeId: type.id,
            },
            order: {
              date: dateFilter,
            },
          },
        });

        const amount = products.reduce((acc, value) => acc + value.quantity, 0);
        if (amount !== 0) {
          return {
            name: type.name,
            amount: amount,
          };
        } else {
          return null;
        }
      }),
    );

    const filteredResult = result.filter((item) => item !== null);

    return NextResponse.json(filteredResult, { status: 200 });
  } catch (error) {
    throw NextResponse.json(
      { message: 'Ошибка получения данных' },
      { status: 500 },
    );
  }
}
