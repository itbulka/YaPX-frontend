import { useUserStatus } from '@/slice/zustand';
import { IPost } from '@/types/types';
import { cn } from '@/utils/cn';
import Link from 'next/link';

export type Props = {
  post: IPost;
};

export const Post = ({ post }: Props) => {
  const userId = useUserStatus(state => state.userId);
  const userName = post.user?.nickname ?? 'anonymous';
  const created = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('ru-RU', { hour: 'numeric', minute: 'numeric' })
    : '';
  const text = post.text;

  return (
    <Link href={`/post/${post.id}`}>
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
        <p className="">{text}</p>
        <div className="flex items-center justify-end gap-1">
          <p className="text-sm">{post.likes?.length ?? 0}</p>
          <button onClick={() => console.log('click like')} disabled={userId ? false : true}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={cn('h-6 w-6', {
                'hover:fill-red-300 hover:stroke-red-300': userId ? true : false,
                'stroke-gray-500': userId ? false : true,
              })}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>
      </article>
    </Link>
  );
};
