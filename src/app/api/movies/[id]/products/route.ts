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
    const { id } = params;

    const response = await db.product.findMany({
      where: {
        movieId: parseInt(id),
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
      },
    });

    const session = await getServerSession(authOptions);

    if (session) {
      const userId = parseInt(session.user.userId);
      const cart = await db.cart.findUnique({
        where: { userId: userId },
      });
      const cartId = cart?.id;

      const productsInCart = cartId
        ? await db.cartProduct.findMany({
            where: {
              cartId: cartId,
            },
            select: {
              productId: true,
            },
          })
        : [];

      const productIdList = productsInCart
        ? productsInCart.map((product) => product.productId)
        : [];

      const products = response.map((product) => {
        return {
          isInCart: productIdList && productIdList.includes(product.id),
          ...product,
        };
      });

      return NextResponse.json(products, { status: 200 });
    }

    const products = response.map((product) => {
      return { isInCart: false, ...product };
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    throw NextResponse.json(
      { message: 'Ошибка получения данных' },
      { status: 500 },
    );
  }
}
