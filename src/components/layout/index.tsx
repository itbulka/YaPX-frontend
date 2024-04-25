import Link from "next/link";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="border-b-[1px] border-gray-200 h-12">
        <div className="px-52 flex justify-between items-center h-full">
          <h1 className="font-semibold">YaPX</h1>
          <nav className="flex gap-4">
            <Link href={"/login"} className="text-slate-800 text-sm hover:text-black">Sign up</Link>
            <Link href={"/login"} className="text-slate-800 text-sm hover:text-black">Log in</Link>
          </nav>
        </div>
      </div>

      <div className="px-52 pt-10 flex gap-20">
        <nav className="flex flex-col gap-4">
            <Link href={"/profile/12"} className="text-slate-800 text-sm p-1 rounded-md transition ease-in duration-300 hover:transition-colors hover:text-white hover:bg-gray-950">Профиль</Link>
            <Link href={"/login"} className="text-slate-800 text-sm p-1 rounded-md transition ease-in duration-300 hover:transition-colors hover:text-white hover:bg-gray-950">Посты</Link>
            <Link href={"/login"} className="text-slate-800 text-sm p-1 rounded-md transition ease-in duration-300 hover:transition-colors hover:text-white hover:bg-gray-950">Настройки</Link>
        </nav>
        <div className="flex flex-1 flex-col gap-10 items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}