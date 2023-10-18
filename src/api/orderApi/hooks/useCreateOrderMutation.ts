import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createOrder } from '..';

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createOrder(),
    onMutate: () => {
      queryClient.setQueryData(['cart'], []);
      toast.loading('Создание заказа');
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries(['cart']);
      toast.dismiss();
      const message = res.message;
      toast.success(message);
    },
    onError: async (error) => {
      await queryClient.invalidateQueries(['cart']);
      toast.dismiss();
      if (typeof error === 'string') {
        toast.error(error);
      }
    },
  });
};
