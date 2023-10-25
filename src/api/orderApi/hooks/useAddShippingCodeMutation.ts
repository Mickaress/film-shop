import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addShippingCode } from '..';
import { OrderType } from '@/models/Order';

export const useAddShippingCodeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { orderId: number; shippingCode: string }) =>
      addShippingCode(variables.orderId, variables.shippingCode),
    onMutate: (variables) => {
      const prevOrders = queryClient.getQueryData<OrderType[]>(['orders']);
      const newOrders = prevOrders?.filter(
        (order) => order.id !== variables.orderId,
      );
      queryClient.setQueryData(['orders'], newOrders);
      toast.loading('Обновление заказов');
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries(['orders']);
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
