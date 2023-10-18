import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '..';
import { ProfileInfoType } from '@/utils/zodSchemas';

export const useGetUserInfoQuery = () => {
  return useQuery<ProfileInfoType>({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
  });
};
