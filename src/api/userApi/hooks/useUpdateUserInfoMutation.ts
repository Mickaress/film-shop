import { ProfileInfoType } from '@/utils/zodSchemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfo } from '..';
import { toast } from 'react-toastify';

export const useUpdateUserInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProfileInfoType) => updateUserInfo(data),
    onMutate: () => {
      toast.loading('Обновление данных');
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries(['user']);
      toast.dismiss();
      const message = res.message;
      toast.success(message);
    },
    onError: async (error) => {
      await queryClient.invalidateQueries(['user']);
      toast.dismiss();
      if (typeof error === 'string') {
        toast.error(error);
      }
    },
  });
};
