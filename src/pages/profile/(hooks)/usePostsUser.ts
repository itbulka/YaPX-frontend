import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getPostsFromUser } from '@/api/users';
import { Post } from '@/models';

export const usePostsUser = (id: string, page: number, perPage: number) => {
  const [posts, setPosts] = useState<Post[]>();

  const {
    data,
    isSuccess,
    isPending: pendingPosts,
  } = useQuery({
    queryKey: ['postsUser', null, id, { page, perPage }],
    queryFn: async () => getPostsFromUser(id, page, perPage),
  });

  useEffect(() => {
    setPosts(data);
  }, [isSuccess]);

  return { posts, pendingPosts };
};
