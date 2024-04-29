import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';

import { signOut } from '@/api/auth';
import { useAuthStore } from '@/store/auth';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const userId = useAuthStore(state => state.userId);
  const setUserId = useAuthStore(state => state.setUserId);

  const logOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: data => {
      if (data.success) setUserId(null);
    },
    onError: err => {
      console.log(err.message);
    },
  });

  return (
    <div className="flex flex-col">
      <div className="h-12 border-b-[1px] border-gray-200 px-52">
        <div className="flex h-full items-center justify-between">
          <Link href={'/'}>
            <h1 className="p-1 text-sm font-semibold text-slate-800">YaPX</h1>
          </Link>
          <nav className="flex gap-4">
            {userId ? (
              <button
                onClick={() => logOutMutation.mutate()}
                className="rounded-md p-1 text-sm text-slate-800 transition duration-300 ease-in hover:underline hover:transition-colors"
              >
                Выход
              </button>
            ) : (
              <>
                <Link
                  href={'/login'}
                  className="rounded-md p-1 text-sm text-slate-800 transition duration-300 ease-in hover:underline hover:transition-colors"
                >
                  Вход
                </Link>
                <Link
                  href={'/registration'}
                  className="rounded-md p-1 text-sm text-slate-800 transition duration-300 ease-in hover:underline hover:transition-colors"
                >
                  Регистрация
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="flex gap-10 px-52 pt-10">
        {userId ? (
          <nav className="flex min-w-32 flex-col gap-2">
            <Link
              href={`/profile/${userId}`}
              className="rounded-md p-1 px-3 text-sm text-slate-800 transition duration-300 ease-in hover:bg-gray-400 hover:text-white hover:transition-colors"
            >
              Профиль
            </Link>
            <Link
              href={'/subscribes'}
              className="rounded-md p-1 px-3 text-sm text-slate-800 transition duration-300 ease-in hover:bg-gray-400 hover:text-white hover:transition-colors"
            >
              Мои подписки
            </Link>
            <Link
              href={'/settings'}
              className="rounded-md p-1 px-3 text-sm text-slate-800 transition duration-300 ease-in hover:bg-gray-400 hover:text-white hover:transition-colors"
            >
              Настройки
            </Link>
          </nav>
        ) : null}

        <div className="flex flex-1 flex-col items-center justify-center gap-1">{children}</div>
      </div>
    </div>
  );
};
