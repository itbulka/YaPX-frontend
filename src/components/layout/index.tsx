import { useUserStatus } from '@/pages/slice/zustand';
import { signOut } from '@/utils/api/auth';
import Link from 'next/link';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const userIn = useUserStatus(state => state.state);
  const logOut = useUserStatus(state => state.logOut);
  return (
    <div className="flex flex-col">
      <div className="h-12 border-b-[1px] border-gray-200 px-10">
        <div className="flex h-full items-center justify-between">
          <Link href={'/'}>
            <h1 className="p-1 text-sm font-semibold text-slate-800">YaPX</h1>
          </Link>
          <nav className="flex gap-4">
            {userIn ? (<button onClick={ async () => {
              try {
                const isOut = signOut();
                if (await isOut) {
                  logOut();
                  localStorage.clear();
                }
              } catch(error) {
                throw new Error();
              }
            }}
              className="rounded-md p-1 text-sm text-slate-800 transition duration-300 ease-in hover:underline hover:transition-colors"
            >
              Log out
            </button>) : (<><Link
                href={'/login'}
                className="rounded-md p-1 text-sm text-slate-800 transition duration-300 ease-in hover:underline hover:transition-colors"
              >
                Sign up
              </Link><Link
                href={'/registration'}
                className="rounded-md p-1 text-sm text-slate-800 transition duration-300 ease-in hover:underline hover:transition-colors"
              >
                  Log in
                </Link></>)}            
          </nav>
        </div>
      </div>

      <div className="flex gap-20 px-52 pt-10">
        <nav className="flex flex-col gap-4">
          <Link
            href={'/profile/12'}
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
        </nav>
        <div className="flex flex-1 flex-col items-center justify-center gap-10">{children}</div>
      </div>
    </div>
  );
};
