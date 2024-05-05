import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import { getPostById } from '@/api/posts';

import { Layout } from '@/layouts';
import { Post } from '@/components/post/post';

export default function PostList() {
  const router = useRouter();
  const id = router.query.id;

  const { data: posts, status } = useQuery({
    queryKey: ['posts', null, id],
    queryFn: async () => getPostById(id as string),
  });

  return (
    <Layout>
      <div className="flex flex-col justify-center gap-5">
        {status === 'pending' ? 'Loading' : null}

        {status === 'success' ? <Post post={posts} /> : null}
      </div>
    </Layout>
  );
}
