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
        setUserId(data.userId)
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
    <div className='flex justify-center mt-20'>
      <form
        onSubmit={handleSubmit( data => loginMutation.mutate(data))}
        className="flex flex-col gap-4 min-w-80 w-full max-w-96"
      >
        <div className='flex items-center'>
          <Link href={'/'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <span className="text-2xl font-semibold text-center w-full block">Авторизация</span>
          {success ? <span className="text-red-500 text-[10px] mr-4">Ошибка в пароле или имени пользователя</span> : null}
        </div>

        <div>
          <label htmlFor='nickname' className='block text-sm pl-1'>Имя пользователя</label>
          <input
            {...register('nickname')}
            className="py-1 px-2 border rounded-md w-full focus:outline-none focus:border-black"
            type='text'
            placeholder="ivan_ivanov"
          />
          {errors.nickname?.message && <p className="ml-4 text-red-500 text-[10px]">{errors.nickname?.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className='block text-sm pl-1'>Пароль</label>
          <input
            {...register('password')}
            className="py-1 px-2 border rounded-md w-full focus:outline-none focus:border-black"
            type="password"
            placeholder="*****"
          />
          {errors.password?.message && <p className="ml-4 text-red-500 text-[10px]">{errors.password?.message}</p>}
        </div>

        <button className="self-end min-w-24 max-w-32 bg-sky-600 rounded-md text-white py-1 px-2 " type="submit">
          Вход
        </button>
      </form>
    </div>
  );
}
