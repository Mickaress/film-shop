import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addCartProduct } from '..';

export const useAddCartProductMutation = () => {
  return useMutation({
    mutationFn: (productId: number) => addCartProduct(productId),
    onSuccess: (res) => {
      const message = res.data.message;
      toast.success(message);
    },
    onError(error) {
      if (typeof error === 'string') {
        toast.error(error);
      }
    },
  });
};
