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
      orderBy: {
        id: 'desc',
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

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Вы не авторизованы' },
        { status: 401 },
      );
    }

    const body = await request.json();
    const productId = parseInt(body);

    const userId = parseInt(session.user.userId);
    const cart = await db.cart.findUnique({
      where: { userId: userId },
    });

    const existingCartProduct = await db.cartProduct.findFirst({
      where: {
        cartId: cart!.id,
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
        cartId: cart!.id,
        productId: productId,
        quantity: 1,
      },
    });

    return NextResponse.json(
      { message: 'Товар добавлен в корзину' },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка получения данных' },
      { status: 500 },
    );
  }
}
