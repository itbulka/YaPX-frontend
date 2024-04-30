import { Dispatch, SetStateAction } from "react";

type PaginatorProps = {
  setter: Dispatch<SetStateAction<number>>,
  page: number,
  perPage: number
}

export default function Paginator({setter, page, perPage}: PaginatorProps) {
  return (
    <div className='flex justify-between w-96 py-2'>
        <button onClick={() => setter(prev => prev > 1 ? prev - perPage : prev)} className='min-w-24 max-w-32 self-end rounded-md bg-sky-600 px-2 py-1 text-white hover:bg-sky-700'>Назад</button>
        <button onClick={() => setter(prev => prev + perPage)} className='min-w-24 max-w-32 self-end rounded-md bg-sky-600 px-2 py-1 text-white hover:bg-sky-700'>Вперед</button>
      </div>
  );
}