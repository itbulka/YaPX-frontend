import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePostById } from '@/api/posts';

export const useDeletePost = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deletePostById(id),
    onSuccess: data => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      }
    },
    onError: err => {
      console.log(err.message);
    },
  });

  return { mutate, isPending };
};
