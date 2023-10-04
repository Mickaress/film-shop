import { SignUpType } from '@/utils/zodSchemas';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '..';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const useSignUpMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: SignUpType) => signUp(data),
    onSuccess: (res) => {
      const message = res.data.message;
      toast.success(message);
      router.push('/sign-in');
    },
    onError(error) {
      if (typeof error === 'string') {
        toast.error(error);
      }
    },
  });
};
