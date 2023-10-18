'use client';

import Input from './ui/Input';
import { useForm } from 'react-hook-form';
import { profileInfoSchema, ProfileInfoType } from '@/utils/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from './ui/Button';
import { useGetUserInfoQuery } from '@/api/userApi/hooks/useGetUserInfoQuery';
import { useUpdateUserInfoMutation } from '@/api/userApi/hooks/useUpdateUserInfoMutation';
import { useEffect } from 'react';

const UserInfo = () => {
  const { data, isFetching } = useGetUserInfoQuery();
  const { mutate: updateUserInfo, isLoading } = useUpdateUserInfoMutation();
  const disabled = isFetching || isLoading;

  const schema = profileInfoSchema;
  const form = useForm<ProfileInfoType>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (data && isFetching !== true) {
      form.reset({
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
      });
    }
  }, [data, isFetching]);

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: ProfileInfoType) => {
    updateUserInfo(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[50%] flex flex-col gap-3 mx-auto"
      noValidate
    >
      <div>
        <p className="mb-1">ФИО</p>
        <Input
          variant="text"
          placeholder="ФИО"
          error={errors.fullName?.message}
          {...register('fullName')}
          disabled={disabled}
        />
      </div>
      <div>
        <p className="mb-1">Телефон</p>
        <Input
          variant="text"
          placeholder="Телефон"
          error={errors.phone?.message}
          {...register('phone')}
          disabled={disabled}
        />
      </div>
      <div>
        <p className="mb-1">Адрес</p>
        <Input
          variant="text"
          placeholder="Адрес"
          error={errors.address?.message}
          {...register('address')}
          disabled={disabled}
        />
      </div>
      <div className="text-center">
        <Button variant="button" type="submit" disabled={disabled}>
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default UserInfo;
