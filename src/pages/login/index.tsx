import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from '@/utils/api/auth';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUserStatus } from '../../slice/zustand';
import { useMutation } from '@tanstack/react-query';

const formSchema = z.object({
  nickname: z.string().min(1, 'Введите никнейм'),
  password: z.string().min(1, 'Введите пароль'),
});

type Form = z.infer<typeof formSchema>;

export default function SignInPage() {
  const router = useRouter();
  const setUserId = useUserStatus(state => state.setUserId);

  const [success, setSuccess] = useState(false);

  const loginMutation = useMutation({
    mutationFn: (form: Form) => signIn(form),
    onSuccess: (data) => {
      if (data.id) {
        setUserId(data.id)
        router.replace('/')
      }
    },
    onError: (err) => {
      console.log(err.message)
      setSuccess(false)
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form
      onSubmit={handleSubmit( data => loginMutation.mutate(data))}
      className="ml-auto mr-auto mt-20 flex min-h-24 max-w-sm flex-col gap-3 rounded-3xl px-10 py-8 shadow-md shadow-slate-300"
    >
      <div className='flex justify-between items-center'>
        <span className="ml-4 text-slate-500 inline-block">Авторизация:</span>
        {success ? <span className="text-red-500 text-[10px] mr-4">Ошибка в пароле или имени пользователя</span> : null}
      </div>

      <input
        {...register('nickname')}
        className="rounded-2xl px-4 py-2 shadow-md shadow-slate-300"
        type='text'
        placeholder="Nickname:"
      />
      {errors.nickname?.message && <p className="ml-4 text-red-500 text-[10px]">{errors.nickname?.message}</p>}

      <input
        {...register('password')}
        className="rounded-2xl px-4 py-2 shadow-md shadow-slate-300"
        type="password"
        placeholder="Password:"
      />
      {errors.password?.message && <p className="ml-4 text-red-500 text-[10px]">{errors.password?.message}</p>}

      <div className="flex justify-between gap-2 pt-1">
        <Link href={'/'}>
          <button
            className="w-24 rounded-2xl py-1 text-slate-500 shadow-md shadow-slate-300 hover:bg-slate-100"
            type="button"
          >
            back
          </button>
        </Link>
        <button
          className="w-24 rounded-2xl py-1 text-slate-500 shadow-md shadow-slate-300 hover:bg-slate-100"
          type="submit"
        >
          sign in
        </button>
      </div>
    </form>
  );
}
