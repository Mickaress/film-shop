import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateCartProduct } from '..';

export const useUpdateCartProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { cartProductId: number; quantity: number }) =>
      updateCartProduct(variables.cartProductId, variables.quantity),
    onMutate: () => {
      toast.loading('Обновление товара');
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
