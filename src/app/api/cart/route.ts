import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
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
    const cartId = await db.cart.findUnique({
      where: { userId: userId },
    });

    const cartProducts = await db.cartProduct.findMany({
      where: { cartId: cartId?.id },
      select: {
        id: true,
        quantity: true,
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
          },
        },
      },
    });

    return NextResponse.json(cartProducts, { status: 200 });
  } catch (error) {
    throw NextResponse.json(
      { message: 'Непредвиденная ошибка' },
      { status: 500 },
    );
  }
}
