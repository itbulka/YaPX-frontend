import { useQuery } from '@tanstack/react-query';

import { getUserById } from '@/api/users';
import { useAuthStore } from '@/store/auth';

export const useProfile = () => {
  const userId = useAuthStore(state => state.userId);

  const { data, isSuccess } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => {
      if (userId) {
        return getUserById(userId);
      }
    },
  });

  return { data, isSuccess };
};
