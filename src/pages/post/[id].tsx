import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import { Post } from '@/components/post';
import { Layout } from '@/layouts';
import { getPostById } from '@/utils/api/posts';

export default function PostId() {
  const router = useRouter();
  const id = router.query.id;

  const { data: posts, status } = useQuery({
    queryKey: ['posts', null, id],
    queryFn: async () => getPostById(id as string),
  });

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        {status === 'pending' ? 'Loading' : null}

        {status === 'success' ? <Post post={posts} /> : null}
      </div>
    </Layout>
  );
}
