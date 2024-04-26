import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUserStatus } from '../../slice/zustand';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '@/utils/api/posts';

const formSchema = z.object({
  text: z.string().min(1, 'Введите сообщение'),
  
});

type Form = z.infer<typeof formSchema>;

export default function MessageForm() {
  const router = useRouter();
  const setUserId = useUserStatus(state => state.setUserId);

  const [success, setSuccess] = useState(false);

  const loginMutation = useMutation({
    mutationFn: (form: Form) => createPost(form),
    onSuccess: (data) => {
      if (data.id) {
        setUserId(data.id)
        router.replace('/')
      }
    },
    onError: (err) => {
      console.log(err.message)
      setSuccess(false)
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });

  return (
   <form action="" className='flex gap-4 min-w-80 w-full max-w-96 justify-between'>
    <input type="text" className='py-1 px-2 border rounded-md w-full focus:outline-none focus:border-black'/>
    <button className='self-end min-w-24 max-w-32 bg-sky-600 rounded-md text-white py-1 px-2'>Отправить</button>
   </form>
  );
}
