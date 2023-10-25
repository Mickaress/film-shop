import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Вы не авторизованы' },
        { status: 401 },
      );
    }

    const { id } = params;
    const orderId = parseInt(id);
    const userId = parseInt(session.user.userId);

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        fullName: true,
        phone: true,
        address: true,
      },
    });

    if (session.user.role !== 'admin') {
      const isAccess = await db.order.findUnique({
        where: {
          id: orderId,
          userId: userId,
        },
      });
      if (!isAccess) {
        return NextResponse.json({ error: 'Нет доступа' }, { status: 402 });
      }
    }

    const products = await db.orderProduct.findMany({
      where: {
        orderId: orderId,
      },
      select: {
        id: true,
        quantity: true,
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const orderProducts = products.map((product) => {
      return {
        id: product.id,
        productId: product.product.id,
        name: product.product.name,
        quantity: product.quantity,
      };
    });

    const orderInfo = {
      user: { ...user },
      products: orderProducts,
    };

    return NextResponse.json(orderInfo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка получения данных' },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Вы не авторизованы' },
        { status: 401 },
      );
    }

    if (session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Вы не админ' }, { status: 401 });
    }

    const { id } = params;
    const orderId = parseInt(id);
    const body = await request.json();
    const { shippingCode } = body;

    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        shippingCode: shippingCode,
      },
    });

    return NextResponse.json({ message: 'Код добавлен' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка получения данных' },
      { status: 500 },
    );
  }
}
