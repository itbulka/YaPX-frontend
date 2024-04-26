import { Layout } from '@/components/layout';
import { useUserStatus } from '@/slice/zustand';
import { IUser } from '@/types/types';
import { getUserById, updateUser } from '@/utils/api/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Введите имя'),
  nickname: z.string(),
  password: z.string(),
});

type Form = z.infer<typeof formSchema>;

export default function Settings() {
  const userId = useUserStatus(state => state.userId);
  const { data: user, status } = useQuery({
    queryKey: ['user', null, userId],
    queryFn: async () => getUserById(userId),
  });

  const updateUserMutation = useMutation({
    mutationFn: (form: Form) => updateUser(form),
    onSuccess: data => {
      console.log(data);
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

  const handleLogout = () => {};

  const handleDeleteAccount = () => {};

  return (
    <Layout>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(data => updateUserMutation.mutate(data))}
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
            className="w-full self-end rounded-md bg-sky-600 px-2 py-1 text-white "
            type="submit"
          >
            Сохранить
          </button>
          <button
            className="rounded-m w-full self-end rounded-md border border-black px-2 py-1 "
            type="button"
            onClick={handleLogout}
          >
            Выйти
          </button>
          <button
            className="w-full self-end rounded-md bg-red-800 px-2 py-1 text-white "
            type="button"
            onClick={handleDeleteAccount}
          >
            Удалить аккаунт
          </button>
        </form>
      </div>
    </Layout>
  );
}
