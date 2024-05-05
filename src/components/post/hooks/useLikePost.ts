import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addLikePost } from '@/api/posts';

export const useLikePost = (id: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => addLikePost(id),
    onSuccess: date => {
      if (date.success) {
        onSuccess?.();
      }
    },
    onError: err => {
      console.log(err.message);
    },
  });

  return { mutate };
};
