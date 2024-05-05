import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '@/api/posts';
import { Form } from '../CreatePostForm';

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useMutation({
    mutationFn: (form: Form) => createPost(form),
    onSuccess: data => {
      if (data.id) {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      }
    },
    onError: err => {
      console.log(err.message);
    },
  });

  return { mutate, isSuccess };
};
