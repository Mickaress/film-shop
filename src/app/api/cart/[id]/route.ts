import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

type Props = {
  params: {
    id: string;
  };
};

export async function POST(request: Request, { params }: Props) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Вы не авторизованы' },
        { status: 401 },
      );
    }

    const { id } = params;
    const productId = parseInt(id);

    const userId = parseInt(session.user.userId);
    const cart = await db.cart.findUnique({
      where: { userId: userId },
    });

    if (cart) {
      const existingCartProduct = await db.cartProduct.findFirst({
        where: {
          cartId: cart.id,
          productId: productId,
        },
      });

      if (existingCartProduct) {
        return NextResponse.json(
          { error: 'Предмет уже в корзине' },
          { status: 409 },
        );
      }

      await db.cartProduct.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: 1,
        },
      });

      return NextResponse.json(
        { message: 'Товар добавлен в корзину' },
        { status: 201 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка получения данных' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Вы не авторизованы' },
        { status: 401 },
      );
    }

    const { id } = params;
    const dataId = parseInt(id);

    const userId = parseInt(session.user.userId);
    const cart = await db.cart.findUnique({
      where: { userId: userId },
    });

    if (cart) {
      await db.cartProduct.delete({
        where: {
          id: dataId,
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
