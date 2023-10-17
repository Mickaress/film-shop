import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, phone, address } = body;
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { error: 'Пользователь с данной почтой уже существует' },
        { status: 409 },
      );
    }

    const existingUserByPhone = await db.user.findUnique({
      where: { phone: phone },
    });
    if (existingUserByPhone) {
      return NextResponse.json(
        { error: 'Пользователь с данным номер телефона уже существует' },
        { status: 409 },
      );
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName: fullName,
        phone: phone,
        address: address,
      },
    });
    await db.cart.create({
      data: {
        userId: newUser.id,
      },
    });
    return NextResponse.json(
      { message: 'Регистрация прошла успешно' },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      { error: 'Непредвиденная ошибка' },
      { status: 500 },
    );
  }
}
