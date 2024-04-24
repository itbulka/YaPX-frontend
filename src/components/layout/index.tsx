import { ReactElement } from "react";
import Image from "next/image";
import yapx from "../../../public/YaPX.svg";
import Link from "next/link";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="max-w-7xl border border-black min-h-24 ml-auto mr-auto px-10 py-8 gap-8 rounded-3xl flex flex-col">      
      <nav className="border border-black rounded-2xl px-8 py-4 flex justify-between">
        <Image src={yapx} alt={"yandex practicum experiment"} className="hover:cursor-pointer"/>
        <div className="flex gap-[6px] self-center">
          <Link href={"/login"}>
            <button className="border border-black rounded-xl min-w-[100px]">Log in</button>
          </Link>
          <span className="inline-block self-center">/</span>
          <Link href={"/registration"}>
            <button className="border border-black rounded-xl min-w-[100px]">Sign up</button>
          </Link>
        </div>
      </nav>
      <div className="border border-black rounded-2xl px-8 py-4 flex flex-col gap-3">
        {children}
      </div>
    </section>
  );
}