import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SettingsIcon } from 'lucide-react';

import Loading from '@/components/loading';
import CreatePostForm from '@/components/message-form/CreatePostForm';
import Paginator from '@/components/pagination';
import { Post } from '@/components/post/post';
import { Layout } from '@/layouts';
import { useAuthStore } from '@/store/auth';
import { cn } from '@/utils/cn';

import { useFollow } from './(hooks)/useFollow';
import { usePostsUser } from './(hooks)/usePostsUser';
import { useUnfollow } from './(hooks)/useUnfollow';
import { useUser } from './(hooks)/useUser';

export default function Profile() {
  const router = useRouter();
  const id = router.query.id as string;

  const sessionId = useAuthStore(state => state.sessionId) ?? '';
  const userId = useAuthStore(state => state.userId) ?? '';

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [isFollowing, setFollowing] = useState<boolean>();
  const [followers, setFollowers] = useState<number>();

  const { user, isPending } = useUser(id);

  const { posts, pendingPosts } = usePostsUser(id, page, perPage);

  const { mutateFollow } = useFollow({
    id: userId,
    sessionId: sessionId,
    onSuccess: () => {
      setFollowing(!isFollowing);
      setFollowers(prev => prev! + 1);
    },
  });

  const { mutateunfollow } = useUnfollow({
    id: userId,
    sessionId: sessionId,
    onSuccess: () => {
      setFollowing(!isFollowing);
      setFollowers(prev => prev! - 1);
    },
  });

  useEffect(() => {
    if (user && user.followers) {
      setFollowing(user.followers.find(elem => elem.follower.id === userId) ? true : false);
      setFollowers(user.followers.length ?? 0);
    }
  }, [user, userId]);

  return (
    <Layout>
      {isPending ? (
        <Loading />
      ) : (
        <div className="mx-auto flex max-w-[50%] flex-col items-center">
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-10">
              <div className="gap-[4px]n items-center">
                <h2 className="text-xl font-semibold text-white">
                  {user?.nickname ?? 'anonymous'}
                </h2>
                <p className="text-xs text-stone-400">{user?.name ?? 'anonymous'}</p>
              </div>
              <div className="flex flex-col items-end justify-end">
                <p className="text-sm text-stone-400">{`Подписчиков: ${followers}`}</p>
              </div>
            </div>
            {userId !== id ? (
              <button
                onClick={isFollowing ? () => mutateunfollow() : () => mutateFollow()}
                className={cn(
                  'rounded-br-lg rounded-tl-lg border border-stone-400 px-2 py-1 text-white transition duration-300 ease-in-out hover:border-white'
                )}
                disabled={userId ? false : true}
              >
                {isFollowing ? 'Отписаться' : 'Подписаться'}
              </button>
            ) : (
              <Link
                href={'/settings'}
                className="transition duration-300 ease-in-out hover:rotate-90"
              >
                <SettingsIcon className="stroke-white" />
              </Link>
            )}
          </div>
          <div className="my-[16px] h-[1px] w-full bg-stone-400"></div>
          <div className="flex flex-col items-center gap-4">
            {userId === id ? <CreatePostForm /> : null}
            {posts?.map(post => {
              return <Post key={post.id} post={post} />;
            })}
            <Paginator setter={setPerPage} page={page} perPage={perPage} />
          </div>
        </div>
      )}
    </Layout>
  );
}
