import Link from "next/link";

export default function RegistationForm() {
  return (
    <form className="max-w-sm border border-black min-h-24 ml-auto mr-auto px-10 py-8 gap-3 rounded-3xl flex flex-col mt-20">
      <span className="ml-4">Registration:</span>
      <input className="border border-black rounded-2xl px-4 py-2" type="email" name="email" placeholder="Email:" />
      <input className="border border-black rounded-2xl px-4 py-2" type="password" name="password" placeholder="Password:" />
      <input className="border border-black rounded-2xl px-4 py-2" type="password" name="password" placeholder="Confirm password:" />
      <div className="flex gap-2 justify-between pt-1">
        <Link href={"/"}>
          <button className="border border-black w-24 rounded-2xl py-1" type="button">back</button>
        </Link>
        <button className="border border-black w-24 rounded-2xl py-1" type="submit">sign up</button>
      </div>
    </form>
  );
}