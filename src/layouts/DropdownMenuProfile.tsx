import { Fragment } from 'react';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { LogOutIcon, SettingsIcon, StickyNoteIcon, UserIcon } from 'lucide-react';

import { useLogout } from '@/hooks/useLogout';
import { useAuthStore } from '@/store/auth';
import { useProfile } from '@/hooks/useProfile';

type Props = {
  userName: string;
  userNickname: string;
};

export default function DropdownMenuProfile({ userName, userNickname }: Props) {
  const userId = useAuthStore(state => state.userId);
  const { mutate, isPending } = useLogout();
  const { data: user} = useProfile();

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full items-center gap-2 rounded-md px-2 hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <div className="flex flex-col items-end">
              <p className=" text-sm text-white">{user?.nickname ?? 'Anonymous'}</p>
              <p className="text-sm text-zinc-400">{user?.name ?? 'Anonymous'}</p>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-800">
              <p className="font-semibold capitalize text-white">{userNickname.charAt(0) || 'A'}</p>
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-zinc-900 px-1 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/profile/${userId}`}
                  className={`${
                    active ? 'bg-zinc-800 text-white' : 'text-white'
                  } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                >
                  <UserIcon className="h-6 w-6 " />
                  Мой профиль
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/subscribes"
                  className={`${
                    active ? 'bg-zinc-800 text-white' : 'text-white'
                  } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                >
                  <StickyNoteIcon />
                  Мои посты
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/settings"
                  className={`${
                    active ? 'bg-zinc-800 text-white' : 'text-white'
                  } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                >
                  <SettingsIcon />
                  Настройки
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => mutate()}
                  className={`${
                    active ? 'bg-zinc-800 text-red-600' : 'text-red-600'
                  } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
                >
                  <LogOutIcon />
                  Выход
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
