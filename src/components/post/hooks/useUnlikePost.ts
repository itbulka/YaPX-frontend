import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removeLikePost } from '@/api/posts';

export const useUnlikePost = (id: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => removeLikePost(id),
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
