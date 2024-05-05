import { Dispatch, SetStateAction } from 'react';

type PaginatorProps = {
  setter: Dispatch<SetStateAction<number>>;
  page: number;
  perPage: number;
};

export default function Paginator({ setter, page, perPage }: PaginatorProps) {
  return (
    <div className="flex w-96 justify-between py-2">
      <button
        onClick={() => setter(prev => prev! + 5)}
        className="text-md mx-auto text-stone-400 hover:text-white"
      >
        Показать еще
      </button>
    </div>
  );
}
