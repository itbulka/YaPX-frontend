import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from '@/utils/api/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserStatus } from '../slice/zustand';

const formSchema = z.object({
  nickname: z.string().min(1, 'Введите никнейм'),
  password: z.string().min(1, 'Введите пароль'),
});

type Form = z.infer<typeof formSchema>;

export default function SignInPage() {
  const stateUser = useUserStatus(state => state.state);
  const logUser = useUserStatus(state => state.logIn);
  const [state, setState] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (stateUser) {
      router.push('/');
    }
  }, [stateUser]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(async data => {
        try {
          const userData = signIn(data).then(res => res.userId);
            if(state) {
              setState(false);
            }

          logUser(await userData);
        } catch {
          setState(true);
        }
      })}
      className="ml-auto mr-auto mt-20 flex min-h-24 max-w-sm flex-col gap-3 rounded-3xl px-10 py-8 shadow-md shadow-slate-300"
    >
      <div className='flex justify-between items-center'>
        <span className="ml-4 text-slate-500 inline-block">Login:</span>
        {state ? <span className="text-red-500 text-[10px] mr-4">Ошибка в пароле или имени пользователя</span> : null}
      </div>

      <input
        {...register('nickname')}
        className="rounded-2xl px-4 py-2 shadow-md shadow-slate-300"
        placeholder="Nickname:"
      />
      {errors.nickname?.message && <p className="ml-4 text-red-500 text-[10px]">{errors.nickname?.message}</p>}

      <input
        {...register('password')}
        className="rounded-2xl px-4 py-2 shadow-md shadow-slate-300"
        type="password"
        name="password"
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
