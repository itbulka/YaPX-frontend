import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updatePostById } from '@/api/posts';

import { type Form } from '../post';

export const useUpdatePost = (id: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (form: Form) => updatePostById(id, form),
    onSuccess: data => {
      if (data.id) {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        onSuccess?.();
      }
    },
    onError: err => {
      console.log(err.message);
    },
  });

  return { mutate, isPending };
};
