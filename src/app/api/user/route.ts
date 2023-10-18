import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Вы не авторизованы' },
        { status: 401 },
      );
    }

    const userId = parseInt(session.user.userId);
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    const userInfo = {
      fullName: user?.fullName,
      phone: user?.phone,
      address: user?.address,
    };

    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Непредвиденная ошибка' },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Вы не авторизованы' },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { fullName, phone, address } = body;

    const userId = parseInt(session.user.userId);
    const existingPhone = await db.user.findUnique({
      where: {
        NOT: {
          id: userId,
        },
        phone: phone,
      },
    });

    if (existingPhone) {
      return NextResponse.json({ error: 'Номер занят' }, { status: 401 });
    }

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        fullName: fullName,
        phone: phone,
        address: address,
      },
    });

    return NextResponse.json({ message: 'Профиль обновлен' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Непредвиденная ошибка' },
      { status: 500 },
    );
  }
}
