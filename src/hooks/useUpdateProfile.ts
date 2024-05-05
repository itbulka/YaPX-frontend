import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUser } from '@/api/users';

import { TypeUserForm } from '../pages/settings';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const { mutate: mutateUpdateProfile, isPending: pendingUpdateProfile } = useMutation({
    mutationFn: (form: TypeUserForm) => updateUser(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: err => {
      console.log(err.message);
    },
  });

  return { mutateUpdateProfile, pendingUpdateProfile };
};
