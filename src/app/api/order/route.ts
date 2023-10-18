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
    const orderList = await db.order.findMany({
      where: { userId: userId },
      select: {
        id: true,
        amount: true,
        shippingCode: true,
      },
    });

    return NextResponse.json(orderList, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Непредвиденная ошибка' },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Вы не авторизованы' },
        { status: 401 },
      );
    }

    const userId = parseInt(session.user.userId);
    const cart = await db.cart.findUnique({
      where: {
        userId: userId,
      },
    });
    const cartProductList = await db.cartProduct.findMany({
      where: {
        cartId: cart?.id,
      },
      select: {
        product: {
          select: {
            id: true,
            price: true,
          },
        },
        quantity: true,
      },
    });
    const amount = cartProductList.reduce(
      (acc, value) => acc + value.product.price * value.quantity,
      0,
    );

    const order = await db.order.create({
      data: {
        userId: userId,
        amount: amount,
      },
    });

    const orderProductData = cartProductList.map((cartProduct) => ({
      orderId: order.id,
      productId: cartProduct.product.id,
      quantity: cartProduct.quantity,
    }));

    await db.orderProduct.createMany({
      data: orderProductData,
    });

    await db.cartProduct.deleteMany({
      where: {
        cartId: cart?.id,
      },
    });

    return NextResponse.json({ message: 'Заказ оформлен' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Непредвиденная ошибка' },
      { status: 500 },
    );
  }
}
