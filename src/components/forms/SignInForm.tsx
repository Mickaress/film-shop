'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { signInSchema, SignInType } from '@/utils/zodSchemas';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
  const router = useRouter();
  const schema = signInSchema;
  const form = useForm<SignInType>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: SignInType) => {
    const signInData = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (signInData?.error) {
      toast.error(signInData.error);
    } else {
      router.replace('/');
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl mb-5">Авторизация</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 items-center"
        noValidate
      >
        <Input
          type="text"
          placeholder="E-mail"
          variant="text"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          type="password"
          placeholder="Пароль"
          variant="text"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button variant="contained" type="submit">
          Войти
        </Button>
      </form>
      <p className="text-center mt-3">
        Нет аккаунта?{' '}
        <Button variant="text" href="/sign-up" className="text-blue">
          Зарегистрируйтесь
        </Button>
      </p>
    </>
  );
};

export default SignInForm;
