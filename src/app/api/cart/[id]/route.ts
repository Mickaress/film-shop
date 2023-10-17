import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: {
    id: string;
  };
};

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Вы не авторизованы' },
        { status: 401 },
      );
    }

    const { id } = params;
    const cartProductId = parseInt(id);
    const body = await request.json();
    const quantity = body;

    const userId = parseInt(session.user.userId);
    const cart = await db.cart.findUnique({
      where: { userId: userId },
    });

    const cartProduct = await db.cartProduct.findUnique({
      where: { id: cartProductId, cartId: cart?.id },
    });

    if (cartProduct) {
      await db.cartProduct.update({
        where: {
          id: cartProductId,
        },
        data: {
          quantity: quantity,
        },
      });

      return NextResponse.json({ message: 'Товар обновлен' }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка получения данных' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Вы не авторизованы' },
        { status: 401 },
      );
    }

    const { id } = params;
    const cartProductId = parseInt(id);

    const userId = parseInt(session.user.userId);
    const cart = await db.cart.findUnique({
      where: { userId: userId },
    });

    const cartProduct = await db.cartProduct.findUnique({
      where: { id: cartProductId, cartId: cart?.id },
    });

    if (cartProduct) {
      await db.cartProduct.delete({
        where: {
          id: cartProductId,
        },
      });

      return NextResponse.json({ message: 'Товар удалён' }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка получения данных' },
      { status: 500 },
    );
  }
}
