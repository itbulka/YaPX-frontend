import { useEffect, useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heart, Trash2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Post as PostType } from '@/models';
import { useAuthStore } from '@/store/auth';
import { cn } from '@/utils/cn';

import { useDeletePost } from './hooks/useDeletePost';
import { useLikePost } from './hooks/useLikePost';
import { useUnlikePost } from './hooks/useUnlikePost';

export type Props = {
  post: PostType;
};

const formSchema = z.object({
  text: z.string().min(1, 'Введите сообщение'),
});

export type Form = z.infer<typeof formSchema>;

export const Post = ({ post }: Props) => {

  // TODO: Реализовать функционал редактирования поста

  const userId = useAuthStore(state => state.userId);
  const isUserPost = userId === post.user?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: mutateDeletePost, isPending: pendingDelete } = useDeletePost(post.id);
  const { mutate: mutateLikePost } = useLikePost(post.id, () => {
    setLikesCount(prev => prev! + 1);
    setLiked(true);
  });
  const { mutate: mutateUnlikePost } = useUnlikePost(post.id, () => {
    setLikesCount(prev => prev! - 1);
    setLiked(false);
  });

  // Свойства для карточки
  const created = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('ru-RU', { hour: 'numeric', minute: 'numeric' })
    : '';

  // Свойства для лайка
  const [liked, setLiked] = useState<boolean>();
  const [likesCount, setLikesCount] = useState<number>();

  useEffect(() => {
    setLikesCount(post.likes?.length ?? 0);
    setLiked(post.likes?.find(elem => elem.user.id === userId) ? true : false);
  }, [post.likes, userId]);

  return (
    <article className="flex w-96 flex-col gap-2 rounded-md bg-zinc-900 p-4">
      <div className="flex items-center justify-between">
        <Link
          href={`/profile/${post.user?.id ?? ''}`}
          className="text-sm text-stone-400 hover:underline"
        >
          {post.user?.nickname ?? 'anonymous'}
        </Link>
        <p className="t text-xs text-stone-400">{created}</p>
      </div>
      <Link href={`/post/${post.id}`}>
        <p className="text-base text-white">{post.text}</p>
      </Link>
      <div className="flex items-center justify-end gap-3">
        {userId && isUserPost ? (
          <div className="flex items-center justify-end gap-2">
            <button type="button" onClick={() => mutateDeletePost()}>
              <Trash2Icon className="h-5 w-5 stroke-stone-400 transition-colors ease-in-out hover:stroke-gray-700" />
            </button>

            {/* <button type="button" onClick={() => setIsEdit(prev => !prev)}>
              <PencilIcon className="h-5 w-5 stroke-gray-500 transition-colors ease-in-out hover:fill-gray-200 hover:stroke-gray-700" />
            </button> */}
          </div>
        ) : null}

        <div className="flex items-center justify-end gap-1">
          <p className="text-sm text-white">{likesCount}</p>
          <button
            type="button"
            onClick={() => (liked ? mutateUnlikePost() : mutateLikePost())}
            disabled={!userId || isUserPost}
          >
            <Heart
              className={cn('h-5 w-5 stroke-white transition-colors ease-in-out', {
                'hover:fill-red-400 hover:stroke-transparent': userId && !isUserPost,
                'fill-stone-400 stroke-transparent': !userId,
                'fill-red-400 stroke-transparent': liked,
              })}
            />
          </button>
        </div>
      </div>
    </article>
  );
};
