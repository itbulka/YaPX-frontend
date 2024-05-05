import { useMutation } from '@tanstack/react-query';

import { following } from '@/api/users';

export const useFollow = ({
  id,
  sessionId,
  onSuccess,
}: {
  id: string;
  sessionId: string;
  onSuccess?: () => void;
}) => {
  const { mutate: mutateFollow, isPending: pendingFollow } = useMutation({
    mutationFn: () => following(id, sessionId),
    onSuccess: data => {
      if (data) {
        onSuccess?.();
      }
    },
    onError: err => {
      console.log(err.message);
    },
  });

  return { mutateFollow, pendingFollow };
};
