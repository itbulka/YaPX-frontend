import { useProfile } from '@/hooks/useProfile';
import { useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';
import { TypeUserForm } from '../pages/settings';

export const useInitialForm = (reset: UseFormReset<TypeUserForm>) => {

  const { data, isSuccess } = useProfile();

  useEffect(() => {
    reset({
      nickname: data?.nickname ?? '',
      name: data?.name ?? '',
    })
  }, [data?.name, data?.nickname, isSuccess, reset])

}