import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import { getPostsFromUser, getUserById } from '@/api/users';
import MessageForm from '@/components/message-form';
import { Post } from '@/components/post';
import { Layout } from '@/layouts';
import { useAuthStore } from '@/store/auth';

export default function Profile() {
  const router = useRouter();
  const id = router.query.id as string;

  const userId = useAuthStore(state => state.userId);
  const [isFollowing, setFollowing] = useState(false);

  const { data: user, status } = useQuery({
    queryKey: ['user', null, id],
    queryFn: async () => getUserById(id),
  });

  const { data: posts } = useQuery({
    queryKey: ['postsUser', null, id],
    queryFn: async () => getPostsFromUser(id),
  });

  useEffect(() => {
    setFollowing(user?.followers?.find(follower => follower.id === userId) ? true : false);
  }, [userId, user]);

  return (
    <Layout>
      {status === 'pending' ? 'Loading' : null}

      {status === 'success' ? (
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-[4px]">
                <h2 className="text-xl font-semibold text-stone-950">
                  {user?.nickname ?? 'anonymous'}
                </h2>
                <p className="text-xs text-slate-800">{user?.name ?? 'anonymous'}</p>
              </div>
              <p className="fonst-regular text-sm">{`${user?.followers?.length ?? 0} followers`}</p>
              <p className="fonst-regular text-sm">{`${posts?.length ?? 0} posts`}</p>
            </div>
            {!(userId === id) ? (
              <button
                className="rounded-br-lg rounded-tl-lg border border-black px-[6px] py-[2px] transition duration-300 ease-in-out hover:bg-black hover:text-white hover:transition-colors"
                disabled={userId ? false : true}
              >
                {isFollowing ? 'Отписаться' : 'Подписаться'}
              </button>
            ) : (
              <Link
                href={'/settings'}
                className="rounded-br-lg rounded-tl-lg border border-black px-[6px] py-[2px] transition duration-300 ease-in-out hover:bg-black hover:text-white hover:transition-colors"
              >
                Настройки
              </Link>
            )}
          </div>
          <div className="my-[16px] h-[1px] w-full bg-stone-400"></div>
          <div className="flex flex-col items-center gap-4">
            {userId === id ? <MessageForm /> : null}
            {posts?.map(post => {
              return (
                <Link key={post.id} href={`/post/${post.id}`}>
                  <Post post={post} />
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </Layout>
  );
}
