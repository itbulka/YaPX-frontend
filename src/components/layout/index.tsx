import Link from "next/link";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <div className="px-10 border-b-[1px] border-gray-200 h-12">
        <div className="flex justify-between items-center h-full">
          <Link href={'/'}>
            <h1 className="text-slate-800 text-sm p-1 font-semibold">YaPX</h1>
          </Link>
          <nav className="flex gap-4">
            <Link href={"/login"} className="text-slate-800 text-sm p-1 rounded-md transition ease-in duration-300 hover:transition-colors hover:underline">Sign up</Link>
            <Link href={"/login"} className="text-slate-800 text-sm p-1 rounded-md transition ease-in duration-300 hover:transition-colors hover:underline">Log in</Link>
          </nav>
        </div>
      </div>

      <div className="ml-auto mr-auto px-10 pt-10 flex gap-10">
        <nav className="flex flex-col gap-4">
            <Link href={"/profile"} className="text-slate-800 text-sm p-1 rounded-md transition ease-in duration-300 hover:transition-colors hover:text-white hover:bg-gray-950">Профиль</Link>
            <Link href={"/my"} className="text-slate-800 text-sm p-1 rounded-md transition ease-in duration-300 hover:transition-colors hover:text-white hover:bg-gray-950">Посты</Link>
            <Link href={"/settings"} className="text-slate-800 text-sm p-1 rounded-md transition ease-in duration-300 hover:transition-colors hover:text-white hover:bg-gray-950">Настройки</Link>
        </nav>
        <div className="flex flex-1 flex-col gap-10 items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}