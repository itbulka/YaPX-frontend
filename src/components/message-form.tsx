import { useState } from 'react';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createPost } from '@/api/posts';

import { useAuthStore } from '../store/auth';

const formSchema = z.object({
  text: z.string().min(1, 'Введите сообщение'),
});

type Form = z.infer<typeof formSchema>;

export default function MessageForm() {
  const router = useRouter();
  const setUserId = useAuthStore(state => state.setUserId);

  const [success, setSuccess] = useState(false);

  const postMutation = useMutation({
    mutationFn: (form: Form) => createPost(form),
    onSuccess: () => {
        setSuccess(true);
        router.reload();
    },
    onError: err => {
      console.log(err.message);
      setSuccess(false);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={handleSubmit(data => postMutation.mutate(data))} className="flex w-full min-w-80 max-w-96 justify-between gap-4">
      <input
        {...register('text')}
        type="text"
        className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none hover:border-slate-300"
      />
      {errors.text?.message && (
              <p className="ml-4 text-[10px] text-red-500">{errors.text?.message}</p>
            )}
      <button className="min-w-24 max-w-32 self-end rounded-md bg-sky-600 px-2 py-1 text-white hover:bg-sky-700"
        type='submit'
      >
        Отправить
      </button>
    </form>
  );
}
