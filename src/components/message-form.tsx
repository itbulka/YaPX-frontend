import { useState } from 'react';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createPost } from '@/utils/api/posts';

import { useUserStore } from '../store/user';

const formSchema = z.object({
  text: z.string().min(1, 'Введите сообщение'),
});

type Form = z.infer<typeof formSchema>;

export default function MessageForm() {
  const router = useRouter();
  const setUserId = useUserStore(state => state.setUserId);

  const [success, setSuccess] = useState(false);

  const loginMutation = useMutation({
    mutationFn: (form: Form) => createPost(form),
    onSuccess: data => {
      if (data.id) {
        setUserId(data.id);
        router.replace('/');
      }
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
    <form action="" className="flex w-full min-w-80 max-w-96 justify-between gap-4">
      <input
        type="text"
        className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
      />
      <button className="min-w-24 max-w-32 self-end rounded-md bg-sky-600 px-2 py-1 text-white">
        Отправить
      </button>
    </form>
  );
}
