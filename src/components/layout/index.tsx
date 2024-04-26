import { useUserStatus } from '@/slice/zustand';
import { signOut } from '@/utils/api/auth';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const userId = useUserStatus(state => state.userId);
  const logOut = useUserStatus(state => state.logOut);

  const logOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: (data) => {
      if (data.succes) logOut();
    },
    onError: (err) => {
      console.log(err.message);
    }
  })

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
            </button>) : (<><Link
                href={'/login'}
                className="rounded-md p-1 text-sm text-slate-800 transition duration-300 ease-in hover:underline hover:transition-colors"
              >
                Вход
              </Link><Link
                href={'/registration'}
                className="rounded-md p-1 text-sm text-slate-800 transition duration-300 ease-in hover:underline hover:transition-colors"
              >
                  Регистрация
                </Link></>)}            
          </nav>
        </div>
      </div>

      <div className="flex gap-10 px-52 pt-10">
        {userId ? (<nav className="flex flex-col gap-2 min-w-32">
          <Link
            href={`/profile/${userId}`}
            className="rounded-md p-1 px-3 text-sm text-slate-800 transition duration-300 ease-in hover:bg-gray-400 hover:text-white hover:transition-colors"
          >
            Профиль
          </Link>
          <Link
            href={'/my'}
            className="rounded-md p-1 px-3 text-sm text-slate-800 transition duration-300 ease-in hover:bg-gray-400 hover:text-white hover:transition-colors"
          >
            Мои посты
          </Link>
          <Link
            href={'/settings'}
            className="rounded-md p-1 px-3 text-sm text-slate-800 transition duration-300 ease-in hover:bg-gray-400 hover:text-white hover:transition-colors"
          >
            Настройки
          </Link>
        </nav>) : null}
        
        <div className="flex flex-1 flex-col items-center justify-center gap-10">{children}</div>
      </div>
    </div>
  );
};
