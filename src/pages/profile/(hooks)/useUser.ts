import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getUserById } from '@/api/users';
import { User } from '@/models';

export const useUser = (id: string) => {
  const [user, setUser] = useState<User>();

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ['user', null, id],
    queryFn: async () => getUserById(id),
  });

  useEffect(() => {
    if (data && isSuccess) setUser(data);
  }, [isSuccess]);

  return { user,  isPending };
};
