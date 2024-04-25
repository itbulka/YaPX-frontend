import Link from "next/link";
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from "@/utils/api/auth";

const formSchema = z.object({
  nickname: z.string().min(1, 'Введите никнейм'),
  password: z.string().min(1, 'Введите пароль'),
});

type Form = z.infer<typeof formSchema>;

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });
  
  return (
    <form onSubmit={handleSubmit(data => signIn(data))} className="max-w-sm shadow-md shadow-slate-300 min-h-24 ml-auto mr-auto px-10 py-8 gap-3 rounded-3xl flex flex-col mt-20">
      <span className="ml-4 text-slate-500">Login:</span>

      <input {...register('nickname')} className="shadow-md shadow-slate-300 rounded-2xl px-4 py-2" placeholder="Nickname:"/>
      {errors.nickname?.message && <p>{errors.nickname?.message}</p>}

      <input {...register('password')} className="shadow-md shadow-slate-300 rounded-2xl px-4 py-2" type="password" name="password" placeholder="Password:" />
      {errors.password?.message && <p>{errors.password?.message}</p>}

      <div className="flex gap-2 justify-between pt-1">
        <Link href={"/"}>
          <button className="shadow-md shadow-slate-300 rounded-2xl w-24 py-1 text-slate-500 hover:bg-slate-100" type="button">back</button>
        </Link>
        <button className="shadow-md shadow-slate-300 rounded-2xl w-24 py-1 text-slate-500 hover:bg-slate-100" type="submit">sign in</button>
      </div>
    </form>
  );
}