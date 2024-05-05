import { deleteUser } from '@/api/users';
import { useAuthStore } from '@/store/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useDeleteProfile = () => {
  const router = useRouter()
  const setUserId = useAuthStore(state => state.setUserId);
  const setSessionId = useAuthStore(state => state.setSessionId);

  const { mutate: mutateDeleteProfile, isPending: pendingDeleteProfile } = useMutation({
    mutationFn: deleteUser,
    onSuccess: data => {
      if (data.success) {
        router.replace(`/`);
        localStorage.clear()
        setUserId(null);
        setSessionId(null);
      }
    },
    onError: err => {
      console.log(err.message);
    },
  });

  return { mutateDeleteProfile, pendingDeleteProfile };
};