import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const countries = await db.country.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(countries, { status: 200 });
  } catch (error) {
    throw NextResponse.json(
      { message: 'Ошибка получения данных' },
      { status: 500 },
    );
  }
}
