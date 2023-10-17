'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { SignUpType, signUpSchema } from '@/utils/zodSchemas';
import { useSignUpMutation } from '@/api/userApi/hooks/useSignUpMutation';

const SignUpForm = () => {
  const schema = signUpSchema;
  const form = useForm<SignUpType>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const { mutate: signUp } = useSignUpMutation();

  const onSubmit = async (data: SignUpType) => {
    signUp(data);
  };

  return (
    <>
      <h1 className="text-center text-3xl mb-5">Регистрация</h1>
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
        <Input
          type="text"
          placeholder="ФИО"
          variant="text"
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <Input
          type="number"
          placeholder="+7xxxxxxxxxx"
          variant="text"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Input
          type="text"
          placeholder="Адрес"
          variant="text"
          error={errors.address?.message}
          {...register('address')}
        />
        <Button variant="button" type="submit">
          Зарегистрироваться
        </Button>
      </form>
      <p className="text-center mt-3">
        Есть аккаунт?{' '}
        <Button variant="text" href="/sign-in">
          Войдите
        </Button>
      </p>
    </>
  );
};

export default SignUpForm;
