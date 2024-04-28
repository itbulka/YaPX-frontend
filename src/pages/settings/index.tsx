import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { deleteUser, getUserById, updateUser } from '@/api/users';
import { Layout } from '@/layouts';
import { useAuthStore } from '@/store/auth';
import { signOut } from '@/api/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const formSchema = z.object({
  name: z.string(),
  nickname: z.string(),
  password: z.string().min(1, 'Введите пароль'),
});

type Form = z.infer<typeof formSchema>;

export default function Settings() {
  const router = useRouter();
  const userId = useAuthStore(state => state.userId) ?? '';
  const setUserId = useAuthStore(state => state.setUserId);

  useEffect(() => {
    if (typeof window !== undefined) {
      const data = localStorage.getItem('yapx-auth');
      const userData = data ? JSON.parse(data!) : null;
      if (!userId || !userData.state.userId ) {
        router.replace('/');
      }
    }
  }, [router, userId]);

  const { data: user } = useQuery({
    queryKey: ['user', null, userId],
    queryFn: async () => getUserById(userId),
  });

  const updateUserMutation = useMutation({
    mutationFn: (form: Form) => updateUser(form),
    onSuccess: () => {
      router.push(`/profile/${userId}`);
    },
    onError: err => {
      console.log(err.message);
    },
  });

  const handleLogout = useMutation({
    mutationFn: signOut,
    onSuccess: data => {
      if (data.success) setUserId(null);
      router.replace(`/profile/${userId}`);
    },
    onError: err => {
      console.log(err.message);
    },
  });

  const handleDeleteAccount = useMutation({
    mutationFn: deleteUser,
    onSuccess: data => {
      if (data.success) {
        router.replace(`/`);
        setUserId(null);
      }
    },
    onError: err => {
      console.log(err.message);
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
    <Layout>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(data => updateUserMutation.mutate({
            name: data.name ? data.name : `${user?.name ?? ''}`,
            nickname: data.nickname ? data.nickname : `${user?.nickname ?? ''}`,
            password: data.password,
          }))}
          className="flex w-full min-w-80 max-w-96 flex-col gap-4"
        >
          <div>
            <label htmlFor="password" className="block pl-1 text-sm">
              Имя Фамилия
            </label>
            <input
              {...register('name')}
              className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
              type="text"
              placeholder={`${user?.name ?? ''}`}
            />
            {errors.name?.message && (
              <p className="ml-4 text-[10px] text-red-500">{errors.name?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block pl-1 text-sm">
              Имя пользователя
            </label>
            <input
              {...register('nickname')}
              className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
              type="text"
              placeholder={`${user?.nickname ?? ''}`}
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
              className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
              type="password"
              placeholder="******"
            />
            {errors.password?.message && (
              <p className="ml-4 text-[10px] text-red-500">{errors.password?.message}</p>
            )}
          </div>

          <button
            className="w-full self-end rounded-md bg-sky-600 px-2 py-1 text-white hover:bg-sky-700"
            type="submit"
          >
            Сохранить
          </button>
          <button
            className="rounded-m w-full self-end rounded-md border border-black px-2 py-1 hover:bg-slate-100"
            type="button"
            onClick={() => handleLogout.mutate()}
          >
            Выйти
          </button>
          <button
            className="w-full self-end rounded-md bg-rose-700 px-2 py-1 text-white hover:bg-rose-800"
            type="button"
            onClick={() => handleDeleteAccount.mutate()}
          >
            Удалить аккаунт
          </button>
        </form>
      </div>
    </Layout>
  );
}
