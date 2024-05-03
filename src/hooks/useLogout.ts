import { useMutation } from '@tanstack/react-query';

import { signOut } from '@/api/auth';
import { useAuthStore } from '@/store/auth';

export const useLogout = () => {
  const setUserId = useAuthStore(state => state.setUserId);

  const { mutate, isPending } = useMutation({
    mutationFn: signOut,
    onSuccess: data => {
      if (data.success) {
        localStorage.clear()
        setUserId(null);
      }
    },
    onError: err => {
      console.log(err.message);
    },
  });

  return { mutate, isPending };
};
