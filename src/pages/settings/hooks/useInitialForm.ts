import { useProfile } from '@/hooks/useProfile';
import { UseFormReset } from 'react-hook-form';
import { TypeUserForm } from '..';
import { useEffect } from 'react';

export const useInitialForm = (reset: UseFormReset<TypeUserForm>) => {

  const { data, isSuccess } = useProfile();

  useEffect(() => {
    reset({
      nickname: data?.nickname ?? '',
      name: data?.name ?? '',
    })
  }, [data?.name, data?.nickname, isSuccess, reset])

}