import Link from 'next/link';

import { Post as PostType } from '@/models';
import { useAuthStore } from '@/store/auth';
import { cn } from '@/utils/cn';
import { useMutation } from '@tanstack/react-query';
import { addLikePost, removeLikePost } from '@/api/posts';
import { useEffect, useState } from 'react';

export type Props = {
  post: PostType;
};

export const Post = ({ post }: Props) => {
  const [liked, setLiked] = useState<boolean>();
  const [likesCount, setLikesCount] = useState<number>();
  const [click, setClick] = useState<boolean>();

  const like = useMutation({
    mutationFn: () => addLikePost(post.id),
    onSuccess: data => {
      if (data) {
        setLiked(!liked);
        setLikesCount(prev => prev! + 1);
      }
    },
    onError: err => {
      console.log(err.message);
    },
  });
  
  {/* множественное нажатие */}
  const unLike = useMutation({
    mutationFn: () => removeLikePost(post.id),
    onSuccess: data => {
      if (data) {
        setLiked(!liked);
        setLikesCount(prev => prev! - 1);
      }
    },
    onError: err => {
      console.log(err.message);
    },
  });

  useEffect(() => {
    setLikesCount(post.likes?.length ?? 0);
    setLiked(post.likes?.find(elem => elem.user.id === userId) ? true : false);
    setClick(liked);
  }, [])

  const userId = useAuthStore(state => state.userId);
  const userName = post.user?.nickname ?? 'anonymous';
  const created = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('ru-RU', { hour: 'numeric', minute: 'numeric' })
    : '';
  const text = post.text;

  return (
      <article className="flex w-96 flex-col gap-2 rounded-md p-4 shadow hover:bg-slate-100">
        <div className="flex items-center justify-between">
          <Link
            href={`/profile/${post.user?.id ?? ''}`}
            className="text-sm text-stone-400 hover:underline"
          >
            {userName}
          </Link>
          <p className="t text-xs text-stone-400">{created}</p>
        </div>
        <Link href={`/post/${post.id}`}>
          <p className="">{text}</p>
        </Link>
        <div className="flex items-center justify-end gap-3">

          {/*ведро*/}
          {userId && userId === post.user?.id ? (
          <div className="flex items-center justify-end gap-1">
            <button type='button'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="h-5 w-5 transition-colors ease-in-out stroke-gray-500 hover:stroke-gray-700 hover:fill-gray-200">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
            {/* редактирование */}
            <button type='button'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="h-5 w-5 transition-colors ease-in-out stroke-gray-500 hover:stroke-gray-700 hover:fill-gray-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </div>) : null }

          <div className="flex items-center justify-end gap-1">
            <p className="text-sm">{likesCount}</p>
            <button 
              type='button'
              onClick={liked ? () => unLike.mutate() : () => like.mutate()} disabled={!userId || userId === post.user?.id ? true : false}>
              <svg
                onClick={() => setClick(prev => !prev)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className={cn('h-5 w-5 transition-colors ease-in-out active:scale-150',
                  userId && userId !== post.user?.id ? 'hover:fill-red-400 hover:stroke-transparent' : ' fill-slate-300',
                  userId ? 'stroke-gray-500' : 'true',
                  (liked ? "fill-red-400" : ""),
                  (click ? "fill-red-400" : "")
                )}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </article>
  );
};
