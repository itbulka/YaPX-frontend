import Link from 'next/link';

import { useAuthStore } from '@/store/auth';

import DropdownMenuProfile from './DropdownMenuProfile';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const userId = useAuthStore(state => state.userId);

  return (
    <>
      <div className="flex h-14 justify-center border-b border-zinc-800">
        <div className="flex h-full min-w-[50%] items-center justify-between">
          <Link href={'/'}>
            <h1 className="p-1 text-lg font-bold text-white">YaPX</h1>
          </Link>

          {userId ? (
            <DropdownMenuProfile userName="Vladimir Povalskij" userNickname="itbulka" />
          ) : (
            <nav className="flex gap-2">
              <Link
                href={'/login'}
                className="rounded-md px-4 py-1 text-sm text-white transition duration-300 ease-in hover:bg-zinc-800 hover:transition-colors"
              >
                Вход
              </Link>
              <Link
                href={'/registration'}
                className="rounded-md px-4 py-1 text-sm text-white transition duration-300 ease-in hover:bg-zinc-800 hover:transition-colors"
              >
                Регистрация
              </Link>
            </nav>
          )}
        </div>
      </div>

      <main className='flex justify-center min-w-[50%]'>
        <div className='pt-10'>
          {children}
        </div>
      </main>
    
    </>
  );
};
