import Link from "next/link";
import { Layout } from "../layout";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../Post/Post";
import { getPostsFromUser, getUserById } from "@/utils/api/users";
import { useUserStatus } from "@/slice/zustand";
import { useEffect, useState } from "react";

interface Props {
    currentId: string
}

// В данном компоненте должны получать id юзера
// Затем делать запрос на получение данных юзера (full)
// Делать запрос на получение всех постов юзера (full)
// В localstorage будет храниться id нашего пользователя
// В компонент мы получаем id юзера на которого перешли
// Будем сверять id. Если все совпадает значит открыть профиль нашего пользователя, Надо отоброжать кнопку настроек, дизайблить лайк на постах
// Иначе отоброжает кнопку подписать, следим за состояние этой кнопки подписан или нет, можно проверять входит ли id из localstorage в id фолловеров пользователя
// Точно так же и с лайком
// Если в localstorage нет id значит вообще не авторизованы и дизейблим все кнопки, но просматривать профиль другого юзера можно

export const ProfilePage = ({currentId}: Props) => {
    const userId = useUserStatus(state => state.userId);
    const [isFollowing, setFollowing] = useState(false);

    const {data: user, status} = useQuery({
        queryKey: ['user', null, currentId],
        queryFn: async () => getUserById(currentId)
    })

    const {data: posts} = useQuery({
        queryKey: ['postsUser', null, currentId],
        queryFn: async () => getPostsFromUser(currentId)
    })

    useEffect(() => {
        setFollowing(user?.followers?.find( follower => follower.id === userId) ? true : false);
    }, [userId, user])

    return (
        <Layout>
            {status === 'pending' ? 'Loading' : null}

            {status === 'success' ? (
                <div className="w-full">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-[4px]">
                            <h2 className="text-xl font-semibold text-stone-950">{user?.nickname ?? 'anonymous'}</h2>
                            <p className="text-xs text-slate-800">{user?.name ?? 'anonymous'}</p>
                        </div>
                        <p className="text-sm fonst-regular">{`${user?.followers?.length ?? 0} followers`}</p>
                        <p className="text-sm fonst-regular">{`${posts?.length ?? 0} posts`}</p>
                    </div>
                    { 
                        !(userId === currentId) 
                            ? <button className="transition ease-in-out duration-300 py-[2px] px-[6px] border border-black rounded-tl-lg rounded-br-lg hover:transition-colors hover:bg-black hover:text-white" disabled={ userId ? false : true}>{isFollowing ? 'Отписаться' : 'Подписаться'}</button>
                            : <Link href={'/'} className="transition ease-in-out duration-300 py-[2px] px-[6px] border border-black rounded-tl-lg rounded-br-lg hover:transition-colors hover:bg-black hover:text-white">Настройки</Link>
                    }
                </div>
                <div className="w-full h-[1px] bg-stone-400 my-[16px]"></div>
                <div className="flex flex-col items-center gap-4">
                    {
                        posts?.map( (post) => {
                            return (
                                <Link key={post.id} href={`/post/${post.id}`}>
                                    <Post post={post} />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            ) : null}
        </Layout>
    );
};