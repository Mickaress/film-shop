import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteCartProduct } from '..';

export const useDeleteCartProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCartProduct(id),
    onSuccess: (res) => {
      const message = res.data.message;
      toast.success(message);
    },
    onError(error) {
      if (typeof error === 'string') {
        toast.error(error);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(['cart']);
    },
  });
};
