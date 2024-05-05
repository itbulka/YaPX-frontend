import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRightIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreatePost } from './hooks/useCreatePost';

const formSchema = z.object({
  text: z.string().min(1, 'Введите сообщение'),
});

type Form = z.infer<typeof formSchema>;

export default function CreatePostForm() {
  const { mutate, isSuccess } = useCreatePost();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: Form) => {
    mutate(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full min-w-80 max-w-96 justify-between gap-4"
    >
      <input
        {...register('text')}
        type="text"
        placeholder="Создайте свой пост..."
        className={`w-full rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1 text-white`}
      />
      {errors.text?.message && (
        <p className="ml-4 text-[10px] text-red-500">{errors.text?.message}</p>
      )}
      <button
        className="rounded-xl bg-zinc-900 px-2 py-1 text-white transition-transform duration-200 ease-in-out hover:translate-x-1 focus:translate-x-1"
        type="submit"
      >
        <ChevronRightIcon />
      </button>
    </form>
  );
}
