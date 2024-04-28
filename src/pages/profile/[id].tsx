import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { following, getPostsFromUser, getUserById, unFollowing } from '@/api/users';
import MessageForm from '@/components/message-form';
import { Post } from '@/components/post';
import { Layout } from '@/layouts';
import { useAuthStore } from '@/store/auth';
import { cn } from '@/utils/cn';

export default function Profile() {
  const router = useRouter();
  const id = router.query.id as string;

  const sessionId = useAuthStore(state => state.sessionId) ?? '';
  const userId = useAuthStore(state => state.userId);

  const [isFollowing, setFollowing] = useState<boolean>();
  const [followers, setFollowers] = useState<number>();

  const { data: user, status } = useQuery({
    queryKey: ['user', null, id],
    queryFn: async () => getUserById(id),
  });

  const { data: posts } = useQuery({
    queryKey: ['postsUser', null, id],
    queryFn: async () => getPostsFromUser(id),
  });
  
  const follow = useMutation({
    mutationFn: () => following(id, sessionId),
    onSuccess: data => {
      if (data) {
        setFollowing(!isFollowing);
        setFollowers(prev => prev! + 1);
      }
    },
    onError: err => {
      console.log(err.message);
    },
  });
  
  {/* множественное нажатие */}
  const unFollow = useMutation({
    mutationFn: () => unFollowing(id, sessionId),
    onSuccess: data => {
      if (data) {
        setFollowing(!isFollowing);
        setFollowers(prev => prev! - 1);
      }
    },
    onError: err => {
      console.log(err.message);
    },
  });

  {/* непонятно, насколько хорошее решение */}
  useEffect(() => {
    if (status === 'success') {
      setFollowing(user?.followers?.find(elem => elem.follower.id === userId) ? true : false);
      setFollowers(user?.followers?.length ?? 0);
    }
  }, [status, userId]);


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
              <p className="fonst-regular text-sm">{`${followers} followers`}</p>
              <p className="fonst-regular text-sm">{`${posts?.length ?? 0} posts`}</p>
            </div>
            {(userId !== id) ? (
              <button
                onClick={isFollowing ? () => unFollow.mutate() : () => follow.mutate()}
                className={cn(("rounded-br-lg rounded-tl-lg border border-slate-400 px-[6px] py-[2px] transition duration-300 ease-in-out"), (userId ? "hover:bg-slate-400 hover:text-white hover:transition-colors" : "bg-slate-200"))}
                disabled={userId ? false : true}
              >
                {isFollowing ? 'Отписаться' : 'Подписаться'}
              </button>
            ) : (
              <Link
                href={'/settings'}
                className="rounded-br-lg rounded-tl-lg border border-slate-400 px-[6px] py-[2px] transition duration-300 ease-in-out hover:bg-slate-200 hover:text-white hover:transition-colors"
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
                
                  <Post key={post.id} post={post} />
                
              );
            })}
          </div>
        </div>
      ) : null}
    </Layout>
  );
}
