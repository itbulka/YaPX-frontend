import { unFollowing } from '@/api/users';
import { useMutation } from '@tanstack/react-query';

export const useUnfollow = ({
  id,
  sessionId,
  onSuccess,
}: {
  id: string;
  sessionId: string;
  onSuccess?: () => void;
}) => {
  const { mutate: mutateunfollow, isPending: pendingUnfollow} = useMutation({
    mutationFn: () => unFollowing(id, sessionId),
    onSuccess: data => {
      if (data) {
        onSuccess?.()
      }
    },
    onError: err => {
      console.log(err.message);
    },
  });

  return { mutateunfollow, pendingUnfollow };
};