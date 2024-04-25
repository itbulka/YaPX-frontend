import { IPost } from '@/types/types';
import Link from 'next/link';
import { use } from 'react';

export type Props = {
  post: IPost;
};

export const Post = (prop: Props) => {  
  const { post } = prop;
  const userName = post.user?.nickname ?? 'anonymous';
  const created = post.createdAt ? new Date(post.createdAt).toLocaleDateString('ru-RU', {hour: 'numeric', minute: 'numeric', second: 'numeric'}) : '';
  const likes = `${post.likes?.length ?? 0} likes`;
  const text = post.text;

  return (
    <article className="rounded-md p-4 shadow gap-2 flex flex-col">
      <div className='flex justify-between items-center'>
        <h1 className="text-sm text-stone-400 hover:underline">{userName}</h1>
        <p className="t text-xs text-stone-400">{created}</p>
      </div>
      <Link href={`/post/${post.id}`}>
        <p className="">{text}</p>
      </Link>
      <div className="flex items-center justify-end gap-2">
        <p className="text-[14px] text-stone-400">{likes}</p>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
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
  );
};
