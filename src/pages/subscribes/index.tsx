import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getPostsFollowing } from '@/api/posts';
import { Post } from '@/components/post';
import { Layout } from '@/layouts';
import { useAuthStore } from '@/store/auth';
import MessageForm from '@/components/message-form';
import { useRouter } from 'next/router';
import Paginator from '@/components/pagination';
import Loading from '@/components/loading';

export default function Home() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const router = useRouter();
  const userId = useAuthStore(state => state.userId);

  {/*нормально ли?*/}
  useEffect(() => {
    if (typeof window !== undefined) {
      const data = localStorage.getItem('yapx-auth');
      const userData = data ? JSON.parse(data!) : null;
      if (!userId || !userData.state.userId ) {
        router.replace('/');
      }
    }
  }, [router, userId]);

  const { data: posts, status } = useQuery({
    queryKey: ['posts', null, { page, perPage }],
    queryFn: async () => getPostsFollowing(page, perPage),
  });

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        {status === 'pending' ? <Loading /> : null}

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
