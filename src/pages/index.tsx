import { Post } from '@/components/Post/Post';
import { Layout } from '@/components/layout';
import { getPosts } from '@/utils/api/posts';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function Home() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  const { data: posts, status } = useQuery({
    queryKey: ['posts', null, { page, perPage }],
    queryFn: async () => getPosts(page, perPage),
  });

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        {status === 'pending' ? 'Loading' : null}

        {status === 'success' ? posts.map(post => <Post key={post.id} post={post} />) : null}
      </div>
    </Layout>
  );
}
