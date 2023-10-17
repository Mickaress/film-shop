import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addCartProduct } from '..';

export const useAddCartProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => addCartProduct(productId),
    onMutate: () => {
      toast.loading('Добавление товара в корзину');
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries(['products']);
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
