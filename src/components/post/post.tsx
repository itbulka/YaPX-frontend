import { useEffect, useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heart, PencilIcon, Trash2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Post as PostType } from '@/models';
import { useAuthStore } from '@/store/auth';
import { cn } from '@/utils/cn';

import { useDeletePost } from './hooks/useDeletePost';
import { useLikePost } from './hooks/useLikePost';
import { useUnlikePost } from './hooks/useUnlikePost';
import { useUpdatePost } from './hooks/useUpdatePost';

export type Props = {
  post: PostType;
};

const formSchema = z.object({
  text: z.string().min(1, 'Введите сообщение'),
});

export type Form = z.infer<typeof formSchema>;

export const Post = ({ post }: Props) => {
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
  const { mutate: mutateUpdatePost, isPending: pendingUpdate } = useUpdatePost(post.id, () => {
    setIsEdit(false);
  });

  // Свойства для карточки
  const created = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('ru-RU', { hour: 'numeric', minute: 'numeric' })
    : '';

  // Свойства для лайка
  const [liked, setLiked] = useState<boolean>();
  const [likesCount, setLikesCount] = useState<number>();

  // Свойства для редактирования
  const [isEdit, setIsEdit] = useState(false);
  const [textForEdit, setTextForEdit] = useState(post.text);

  const handleSubmitForm = () => {
    handleSubmit(data => mutateUpdatePost(data));
  };

  useEffect(() => {
    setLikesCount(post.likes?.length ?? 0);
    setLiked(post.likes?.find(elem => elem.user.id === userId) ? true : false);
  }, []);

  return (
    <article className="flex w-96 flex-col gap-2 rounded-md p-4 shadow hover:bg-slate-100">
      <div className="flex items-center justify-between">
        <Link
          href={`/profile/${post.user?.id ?? ''}`}
          className="text-sm text-stone-400 hover:underline"
        >
          {post.user?.nickname ?? 'anonymous'}
        </Link>
        <p className="t text-xs text-stone-400">{created}</p>
      </div>
      {isUserPost && isEdit ? (
        <form
          onSubmit={handleSubmitForm}
          className="flex w-full min-w-80 max-w-96 justify-between gap-4"
        >
          <input
            {...register('text')}
            value={textForEdit}
            onChange={e => setTextForEdit(e.target.value)}
            type="text"
            className="w-full rounded-md border px-2 py-1 hover:border-slate-300 focus:border-black focus:outline-none"
          />
          {errors.text?.message && (
            <p className="ml-4 text-[10px] text-red-500">{errors.text?.message}</p>
          )}
          <button
            type="submit"
            disabled={pendingUpdate}
            className="min-w-24 max-w-32 self-end rounded-md bg-sky-600 px-2 py-1 text-white hover:bg-sky-700"
          >
            Изменить
          </button>
        </form>
      ) : (
        <Link href={`/post/${post.id}`}>
          <p className="">{post.text}</p>
        </Link>
      )}
      <div className="flex items-center justify-end gap-3">
        {userId && isUserPost ? (
          <div className="flex items-center justify-end gap-1">
            <button type="button" onClick={() => mutateDeletePost()}>
              <Trash2Icon className="h-5 w-5 stroke-gray-500 transition-colors ease-in-out hover:fill-gray-200 hover:stroke-gray-700" />
            </button>

            <button type="button" onClick={() => setIsEdit(prev => !prev)}>
              <PencilIcon className="h-5 w-5 stroke-gray-500 transition-colors ease-in-out hover:fill-gray-200 hover:stroke-gray-700" />
            </button>
          </div>
        ) : null}

        <div className="flex items-center justify-end gap-1">
          <p className="text-sm">{likesCount}</p>
          <button
            type="button"
            onClick={() => (liked ? mutateUnlikePost() : mutateLikePost())}
            disabled={!userId || isUserPost}
          >
            <Heart
              className={cn('h-5 w-5 stroke-gray-400 transition-colors ease-in-out', {
                'hover:fill-red-400 hover:stroke-transparent': userId && !isUserPost,
                'stroke-gray-400': !userId,
                'fill-red-400 stroke-transparent': liked,
              })}
            />
          </button>
        </div>
      </div>
    </article>
  );
};
