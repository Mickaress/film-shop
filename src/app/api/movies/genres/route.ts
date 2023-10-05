import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const genres = await db.genre.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(genres, { status: 200 });
  } catch (error) {
    throw NextResponse.json(
      { message: 'Ошибка получения данных' },
      { status: 500 },
    );
  }
}
