import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteCartProduct } from '..';

export const useDeleteCartProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCartProduct(id),
    onMutate: () => {
      toast.loading('Удаление товара');
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries(['cart']);
      toast.dismiss();
      const message = res.message;
      toast.success(message);
    },
    onError(error) {
      if (typeof error === 'string') {
        toast.error(error);
      }
    },
  });
};
