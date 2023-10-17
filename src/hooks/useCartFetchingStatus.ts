import { useGetCartProductsQuery } from '@/api/cartApi/hooks/useGetCartProductsQuery';
import { useAddCartProductMutation } from '@/api/cartApi/hooks/useAddCartProductMutation';
import { useDeleteCartProductMutation } from '@/api/cartApi/hooks/useDeleteCartProductMutation';

const useCartFetchingStatus = () => {
  const { isFetching } = useGetCartProductsQuery();
  const { isLoading: addLoading } = useAddCartProductMutation();
  const { isLoading: deleteLoading } = useDeleteCartProductMutation();
  return isFetching || addLoading || deleteLoading;
};

export default useCartFetchingStatus;
