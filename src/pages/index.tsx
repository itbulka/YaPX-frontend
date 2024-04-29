import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getPosts } from '@/api/posts';
import { Post } from '@/components/post';
import { Layout } from '@/layouts';
import { useAuthStore } from '@/store/auth';
import MessageForm from '@/components/message-form';
import Loading from '@/components/loading';
import Paginator from '@/components/pagination';

export default function Home() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const userId = useAuthStore(state => state.userId);

  const { data: posts, status } = useQuery({
    queryKey: ['posts', null, { page, perPage }],
    queryFn: async () => getPosts(page, perPage),
  });

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        {status === 'pending'
        ? 
        <Loading />
        : null}

        {status === 'success' ? 
          <>
            {userId ? <MessageForm /> : null}
            {posts.map(post => <Post key={post.id} post={post} />)}
            <Paginator setter={setPage} page={page} perPage={perPage} />
          </>
          : null
        }
      </div>
    </Layout>
  );
}
