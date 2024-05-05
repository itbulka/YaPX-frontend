import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AuthProvider } from '@/components/auth-provider';
import { Layout } from '@/layouts';

import { useDeleteProfile } from '../../hooks/useDeleteProfile';
import { useInitialForm } from '../../hooks/useInitialForm';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';

const formSchema = z.object({
  name: z.string(),
  nickname: z.string(),
  password: z.string(),
});

export type TypeUserForm = z.infer<typeof formSchema>;

export default function Settings() {
  const { mutateUpdateProfile, pendingUpdateProfile } = useUpdateProfile();

  const { mutateDeleteProfile, pendingDeleteProfile } = useDeleteProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeUserForm>({
    resolver: zodResolver(formSchema),
  });

  useInitialForm(reset);

  return (
    <Layout>
      <AuthProvider>
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit(data =>
              mutateUpdateProfile({
                name: data.name,
                nickname: data.nickname,
                password: data.password,
              })
            )}
            className="flex w-full min-w-80 max-w-96 flex-col gap-4"
          >
            <div>
              <label htmlFor="password" className="mb-2 block pl-1 text-sm text-white">
                Имя Фамилия
              </label>
              <input
                {...register('name')}
                className={`w-full rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1 text-white`}
                type="text"
                placeholder={`Имя Фамилия`}
              />
              {errors.name?.message && (
                <p className="ml-4 text-[10px] text-red-500">{errors.name?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block pl-1 text-sm text-white">
                Имя пользователя
              </label>
              <input
                {...register('nickname')}
                className={`w-full rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1 text-white`}
                type="text"
                placeholder={`Имя пользователя`}
              />
              {errors.nickname?.message && (
                <p className="ml-4 text-[10px] text-red-500">{errors.nickname?.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block pl-1 text-sm text-white">
                Пароль
              </label>
              <input
                {...register('password')}
                className={`w-full rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1 text-white`}
                type="password"
                placeholder="******"
              />
              {errors.password?.message && (
                <p className="ml-4 text-[10px] text-red-500">{errors.password?.message}</p>
              )}
            </div>

            <button
              className="w-ful rounded-md border border-transparent bg-zinc-900 px-2 py-2 text-white transition-colors duration-200 ease-in-out hover:border-white"
              type="submit"
            >
              Сохранить
            </button>
            <button
              className="w-full self-end rounded-md border border-rose-700 px-2 py-2 text-white transition-colors duration-200 ease-in-out hover:bg-rose-800"
              type="button"
              onClick={() => mutateDeleteProfile()}
            >
              Удалить аккаунт
            </button>
          </form>
        </div>
      </AuthProvider>
    </Layout>
  );
}
