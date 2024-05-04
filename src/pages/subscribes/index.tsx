import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import { getPostsFollowing } from '@/api/posts';
import { AuthProvider } from '@/components/auth-provider';
import Loading from '@/components/loading';
import CreatePostForm from '@/components/message-form/CreatePostForm';
import Paginator from '@/components/pagination';
import { Post } from '@/components/post/Post';
import { Layout } from '@/layouts';
import { useAuthStore } from '@/store/auth';

export default function Home() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const router = useRouter();
  const userId = useAuthStore(state => state.userId);

  const { data: posts, status } = useQuery({
    queryKey: ['posts', null, { page, perPage }],
    queryFn: async () => getPostsFollowing(page, perPage),
  });

  return (
    <Layout>
      <AuthProvider>
        <div className="flex flex-col items-center gap-5">
          {status === 'pending' ? <Loading /> : null}

          {status === 'success' ? (
            <>
              {userId ? <CreatePostForm /> : null}
              {posts.map(post => (
                <Post key={post.id} post={post} />
              ))}
              <Paginator setter={setPage} page={page} perPage={perPage} />
            </>
          ) : null}
        </div>
      </AuthProvider>
    </Layout>
  );
}
