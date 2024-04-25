import { Layout } from '../layout';
import Link from 'next/link';
import { getPosts } from '@/utils/api/posts';
import { useQuery } from '@tanstack/react-query';
import { Post } from '../Post/Post';
import { useState } from 'react';

export const HomePage = () => {
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

        {status === 'success' ? (
          <div className='max-w-5xl rounded-md p-4 shadow gap-2 flex flex-col'>
            {posts.map(post => (
              <div key={post.id} className='hover:bg-slate-100'>
                <Post key={post.id} post={post} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Layout>
  );
};
