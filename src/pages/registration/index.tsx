import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signIn, signUp } from '@/api/auth';
import { AuthProvider } from '@/components/auth-provider';

import { useAuthStore } from '../../store/auth';

const formSchema = z.object({
  name: z.string().min(1, 'Введите имя'),
  nickname: z.string().min(1, 'Введите никнейм'),
  password: z.string().min(1, 'Введите пароль'),
});

type Form = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const registrationMutation = useMutation({
    mutationFn: (form: Form) => signUp(form),
    onSuccess: data => {
      if (data.id) {
        router.push('/login');
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
      <div className="mt-20 flex justify-center">
        <form
          onSubmit={handleSubmit(data => registrationMutation.mutate(data))}
          className="flex w-full min-w-80 max-w-96 flex-col gap-4"
        >
          <div className="flex items-center">
            <Link href={'/'}>
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
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </Link>
            <span className="block w-full text-center text-2xl font-semibold">Регистрация:</span>
            {success ? (
              <span className="mr-4 text-[10px] text-red-500">
                Ошибка в пароле или имени пользователя
              </span>
            ) : null}
          </div>

          <div>
            <label htmlFor="name" className="block pl-1 text-sm">
              Имя Фамилия
            </label>
            <input
              {...register('name')}
              id="name"
              className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
              type="text"
              placeholder="Иван Иванов"
              autoComplete="true"
            />
            {errors.name?.message && (
              <p className="ml-4 text-[10px] text-red-500">{errors.name?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="nickname" className="block pl-1 text-sm">
              Имя пользователя
            </label>
            <input
              {...register('nickname')}
              id="nickname"
              className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
              type="text"
              placeholder="Ivan_Ivanov"
              autoComplete="true"
            />
            {errors.nickname?.message && (
              <p className="ml-4 text-[10px] text-red-500">{errors.nickname?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block pl-1 text-sm">
              Пароль
            </label>
            <input
              {...register('password')}
              id="password"
              className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
              type="password"
              placeholder="******"
            />
            {errors.password?.message && (
              <p className="ml-4 text-[10px] text-red-500">{errors.password?.message}</p>
            )}
          </div>

          <button
            className="min-w-24 self-end rounded-md bg-sky-600 px-2 py-1 text-white "
            type="submit"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
  );
}
